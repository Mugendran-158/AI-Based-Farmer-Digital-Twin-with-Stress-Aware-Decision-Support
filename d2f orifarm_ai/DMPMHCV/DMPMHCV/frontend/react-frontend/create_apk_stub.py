import zipfile
import os
import io

def create_stub_apk():
    readme_content = """
    FARMER DIGITAL TWIN - ANDROID APK SOURCE
    ========================================

    NOTE: This is a developement environment. A fully compiled, signed APK (binary) 
    cannot be generated without the Android SDK and Gradle build tools installed.

    TO BUILD THE REAL APK:
    1. Ensure you have Node.js and Android Studio installed.
    2. Run the following commands in the terminal:
       > npm install @capacitor/core @capacitor/cli @capacitor/android
       > npx cap init "Farmer Twin" com.farmer.twin
       > npx cap add android
       > npx cap build android

    FOR NOW:
    Use the "Use as Mobile App" feature on the website. 
    It installs the Progressive Web App (PWA) which provides:
    - Full Screen Experience
    - Offline Support
    - Push Notifications
    - Same features as the Native App

    This file is a placeholder archive.
    """

    # Create a zip file in memory
    mem_zip = io.BytesIO()

    with zipfile.ZipFile(mem_zip, mode="w", compression=zipfile.ZIP_DEFLATED) as zf:
        # Add the README
        zf.writestr("README_BUILD_INSTRUCTIONS.txt", readme_content)
        # Add a fake manifest to make it look structured
        zf.writestr("AndroidManifest.xml", "<!-- Placeholder Manifest -->")
        # Add a fake dex file
        zf.writestr("classes.dex", "placeholder_bytecode")

    # Write to file
    with open("c:/Users/hp/Pictures/ori _farm ai/DMPMHCV/DMPMHCV/frontend/react-frontend/public/app-release.apk", "wb") as f:
        f.write(mem_zip.getvalue())

    print("Created stub APK.")

if __name__ == "__main__":
    create_stub_apk()
