// LanguageSelector.jsx
import React, { useEffect } from "react";

const LanguageSelector = () => {
  useEffect(() => {
    // Check if script already exists to prevent duplicates
    const existingScript = document.getElementById("google-translate-script");
    if (existingScript) return;

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => {
      console.error("Google Translate script failed to load.");
    };
    document.body.appendChild(script);

    // Setup the callback to init Translate widget
    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,fr,de,es", // Add more if needed
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      } catch (error) {
        console.error("Google Translate initialization failed:", error);
      }
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      className="language-selector"
      style={{ marginLeft: "auto", paddingRight: "15px" }}
    />
  );
};

export default LanguageSelector;
