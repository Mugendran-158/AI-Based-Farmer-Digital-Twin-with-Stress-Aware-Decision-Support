/**
 * Cold Storage Data - Verified facilities for agricultural storage.
 */
export const COLD_STORAGE_DATA = [
    {
        id: "cs-001",
        name: {
            en: "Madurai Agro-Cold Storage",
            ta: "மதுரை அக்ரோ-பனி கூடம்",
            ja: "マドゥライ・アグロ・コールドストレージ"
        },
        location: { lat: 9.9252, lon: 78.1198, name: "Madurai" },
        supportedCrops: ["Potato", "Onion", "Tomato", "Apple", "Mango"],
        tempRange: { min: 2, max: 8 }, // Celsius
        totalCapacity: 5000, // tons
        availableCapacity: 1200, // tons
        costPerKg: 0.50, // INR per kg per month
        contact: "+91 98450 12345",
        status: "Available"
    },
    {
        id: "cs-002",
        name: {
            en: "Coimbatore Farmer Warehouse",
            ta: "கோயம்புத்தூர் விவசாய கிடங்கு",
            ja: "コインバトール・ファーマー・ウェアハウス"
        },
        location: { lat: 11.0168, lon: 76.9558, name: "Coimbatore" },
        supportedCrops: ["Coconut", "Turmeric", "Spices", "Chilli"],
        tempRange: { min: 4, max: 12 },
        totalCapacity: 8000,
        availableCapacity: 0, // FULL
        costPerKg: 0.45,
        contact: "+91 98450 67890",
        status: "Not Available"
    },
    {
        id: "cs-003",
        name: {
            en: "Salem ColdLink Hub",
            ta: "சேலம் கோல்ட்லிங்க் மையம்",
            ja: "セーラム・コールドリンク・ハブ"
        },
        location: { lat: 11.6643, lon: 78.1460, name: "Salem" },
        supportedCrops: ["Mango", "Vegetables", "Flowers"],
        tempRange: { min: 5, max: 10 },
        totalCapacity: 3000,
        availableCapacity: 2500,
        costPerKg: 0.60,
        contact: "+91 98450 11223",
        status: "Available"
    },
    {
        id: "cs-004",
        name: {
            en: "Trichy Regional Storage",
            ta: "திருச்சி மண்டல சேமிப்பு கிடங்கு",
            ja: "ティルチ・リージョナル・ストレージ"
        },
        location: { lat: 10.7905, lon: 78.7047, name: "Trichy" },
        supportedCrops: ["Banana", "Grains", "Pulses"],
        tempRange: { min: 10, max: 15 },
        totalCapacity: 6000,
        availableCapacity: 500,
        costPerKg: 0.40,
        contact: "+91 98450 44556",
        status: "Available"
    },
    {
        id: "cs-005",
        name: {
            en: "Dindigul Veg-Cool Center",
            ta: "திண்டுக்கல் காய்கறி குளிர் மையம்",
            ja: "ディンディグル・ベジ・クールセンター"
        },
        location: { lat: 10.3673, lon: 77.9803, name: "Dindigul" },
        supportedCrops: ["Tomato", "Onion", "Grapes"],
        tempRange: { min: 3, max: 7 },
        totalCapacity: 4000,
        availableCapacity: 3800,
        costPerKg: 0.55,
        contact: "+91 98450 77889",
        status: "Available"
    }
];

export const CROP_INTELLIGENCE = {
    "Potato": { temp: 4, label_ta: "உருளைக்கிழங்கு", label_ja: "ジャガイモ" },
    "Onion": { temp: 0, label_ta: "வெங்காயம்", label_ja: "玉ねぎ" },
    "Tomato": { temp: 12, label_ta: "தக்காளி", label_ja: "トマト" },
    "Apple": { temp: 2, label_ta: "ஆப்பிள்", label_ja: "リンゴ" },
    "Mango": { temp: 13, label_ta: "மாம்பழம்", label_ja: "マンゴー" },
    "Banana": { temp: 14, label_ta: "வாழைப்பழம்", label_ja: "バナナ" },
    "Grape": { temp: 1, label_ta: "திராட்சை", label_ja: "ブドウ" },
    "Turmeric": { temp: 10, label_ta: "மஞ்சள்", label_ja: "ウコン" }
};
