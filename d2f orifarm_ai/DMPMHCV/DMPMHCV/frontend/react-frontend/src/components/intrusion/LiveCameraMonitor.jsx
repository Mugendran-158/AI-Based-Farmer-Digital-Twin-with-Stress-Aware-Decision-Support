
import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

const LiveCameraMonitor = ({ onDetection, language }) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [model, setModel] = useState(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [lastAlertTime, setLastAlertTime] = useState(0);

    // Load COCO-SSD Model
    useEffect(() => {
        const loadModel = async () => {
            try {
                console.log("Loading COCO-SSD model...");
                const loadedModel = await cocoSsd.load();
                setModel(loadedModel);
                console.log("Model loaded.");
            } catch (err) {
                console.error("Failed to load model:", err);
            }
        };
        loadModel();
    }, []);

    // Run detection
    const runDetection = useCallback(async () => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4 &&
            model
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas height and width
            if (canvasRef.current) {
                canvasRef.current.width = videoWidth;
                canvasRef.current.height = videoHeight;
            }

            // Make Detections
            const predictions = await model.detect(video);

            // Draw mesh
            const ctx = canvasRef.current.getContext("2d");
            drawRect(predictions, ctx);

            // Check for animals
            checkForAnimals(predictions);
        }
    }, [model, onDetection]);

    // Loop detection
    useEffect(() => {
        let interval;
        if (isDetecting && model) {
            interval = setInterval(() => {
                runDetection();
            }, 500); // Check every 500ms
        }
        return () => clearInterval(interval);
    }, [isDetecting, model, runDetection]);

    // Animal filter
    const checkForAnimals = (predictions) => {
        const animals = ["cat", "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "person"]; // Person included for demo security
        const now = Date.now();

        // Debounce: Only alert once every 30 seconds
        if (now - lastAlertTime < 30000) return;

        const detectedAnimal = predictions.find(
            (p) => animals.includes(p.class) && p.score > 0.6
        );

        if (detectedAnimal) {
            console.log("Detected:", detectedAnimal.class);
            setLastAlertTime(now);

            // Trigger Alert Callback
            onDetection({
                animal: detectedAnimal.class,
                score: detectedAnimal.score,
                timestamp: new Date().toISOString()
            });

            // NEW: Directly trigger backend alert (SMS/Email)
            triggerBackendAlert(detectedAnimal.class, detectedAnimal.score);
        }
    };

    const triggerBackendAlert = async (type, score) => {
        try {
            // Get contacts from local storage config if available
            let contacts = [];
            let phoneNumbers = [];
            const savedConfig = localStorage.getItem('farmerSafeTwinConfig');
            if (savedConfig) {
                const config = JSON.parse(savedConfig);
                contacts = config.contacts || [];
                phoneNumbers = config.phoneNumbers || [];
            }

            console.log("Transmission: Sending Alert...", { type, score, phoneNumbers });

            await fetch('http://127.0.0.1:5000/api/send-alert-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    detectionType: `Detected ${type}`,
                    location: 'Live Camera Feed',
                    accuracy: Math.round(score * 100) + '%',
                    contacts: contacts.filter(c => c),
                    phone_numbers: phoneNumbers.filter(p => p) // Send phone numbers for SMS
                })
            });
        } catch (e) {
            console.error("Failed to send alert:", e);
        }
    };

    const drawRect = (detections, ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // Font options
        const font = "16px sans-serif";
        ctx.font = font;
        ctx.textBaseline = "top";

        detections.forEach((prediction) => {
            const [x, y, width, height] = prediction["bbox"];
            const text = `${prediction["class"]} (${Math.round(prediction["score"] * 100)}%)`;
            const color = prediction["class"] === "person" ? "#00FFFF" : "#FF0000"; // Cyan for person, Red for animal

            // Draw Box
            ctx.strokeStyle = color;
            ctx.lineWidth = 4;
            ctx.strokeRect(x, y, width, height);

            // Draw Label Background
            ctx.fillStyle = color;
            const textWidth = ctx.measureText(text).width;
            const textHeight = parseInt(font, 10);
            ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

            // Draw Text
            ctx.fillStyle = "#000000";
            ctx.fillText(text, x, y);
        });
    };

    return (
        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-black">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-black/60 backdrop-blur-md p-3 flex justify-between items-center text-white border-b border-white/10">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    <span className="text-xs font-bold font-mono tracking-widest text-red-500">LIVE REC</span>
                </div>
                <button
                    onClick={() => setIsDetecting(!isDetecting)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${isDetecting ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
                >
                    {isDetecting ? 'STOP' : 'START'}
                </button>
            </div>

            {/* Camera Feed */}
            <Webcam
                ref={webcamRef}
                muted={true}
                style={{
                    width: "100%",
                    height: "auto",
                }}
            />

            {/* Canvas for Bounding Boxes */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full z-10"
            />

            {!model && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30">
                    <div className="text-cyan-400 font-mono text-sm animate-pulse">Loading AI Vision Model...</div>
                </div>
            )}
        </div>
    );
};

export default LiveCameraMonitor;
