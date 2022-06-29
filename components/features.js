import { useRouter } from "next/router";

import styles from "./features.module.css";

const Feature = ({ text, icon }) => (
  <div className={styles.feature}>
    {icon}
    <h4>{text}</h4>
  </div>
);

const TITLE_WITH_TRANSLATIONS = {
  "en-US": "Flip the script with our consultancy services",
  "hu-HU":
    "Szolgáltatások, melyek megváltoztatják a narratívát vállalkozásod körül",
};

// Transaltions for Features
const FEATURES_WITH_TRANSLATIONS = {
  "en-US": {
    analytics: "Analytics & automation",
    appManagement: "Application management",
    cloudStrategy: "Cloud strategy",
    eCommerce: "Digital commerce",
    machineLearning: "Machine learning",
    marketing: "Marketing",
    qualityEngineering: "Quality engineering",
    softwareEngineering: "Software engineering",
    systemsDesign: "Systems design",
    webHosting: "Web hosting",
    webManagement: "Website management",
    uiUxDesign: "UI/UX design",
  },
  "hu-HU": {
    analytics: "Analitika és automatizáció",
    appManagement: "Alkalmazás menedzsment",
    cloudStrategy: "Felhőstratégia",
    eCommerce: "Digitális kereskedelem",
    machineLearning: "Gépi tanulás",
    marketing: "Marketing",
    qualityEngineering: "Minőségbiztosítás",
    softwareEngineering: "Szoftverfejlesztés",
    systemsDesign: "Rendszertervezés",
    webHosting: "Web hosting",
    webManagement: "Weboldal menedzsment",
    uiUxDesign: "UI/UX design",
  },
};

export default () => {
  const { locale, defaultLocale } = useRouter();

  const featureText = (key) =>
    FEATURES_WITH_TRANSLATIONS[locale]?.[key] ??
    FEATURES_WITH_TRANSLATIONS[defaultLocale][key]; // Fallback for missing translations

  return (
    <div className="mx-auto max-w-full w-[880px] text-center px-4 mb-10">
      <p className="text-lg mb-2 text-gray-600 md:!text-2xl">
        {TITLE_WITH_TRANSLATIONS[locale]}
      </p>
      <div className={styles.features}>
        <Feature
          text={featureText("analytics")}
          icon={
            <svg
              viewBox="0 0 36 36"
              width="24"
              height="24"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className="clr-i-outline clr-i-outline-path-1"
                d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,29V7H32V29Z"
              ></path>
              <path
                d="M 7 10 L 13 10 L 13 26 L 11.4 26 L 11.4 11.6 L 8.6 11.6 L 8.6 26 L 7 26 Z"
                className="clr-i-outline clr-i-outline-path-2"
              ></path>
              <path
                d="M 15 19 L 21 19 L 21 26 L 19.4 26 L 19.4 20.6 L 16.6 20.6 L 16.6 26 L 15 26 Z"
                className="clr-i-outline clr-i-outline-path-3"
              ></path>
              <path
                d="M 23 16 L 29 16 L 29 26 L 27.4 26 L 27.4 17.6 L 24.6 17.6 L 24.6 26 L 23 26 Z"
                className="clr-i-outline clr-i-outline-path-4"
              ></path>
            </svg>
          }
        />
        <Feature
          text={featureText("appManagement")}
          icon={
            <svg
              viewBox="0 0 36 36"
              width="24"
              height="24"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M25,4H11A2,2,0,0,0,9,6V30a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V6A2,2,0,0,0,25,4ZM11,6H25V24H11Zm0,24V26H25v4Z"
                className="clr-i-outline clr-i-outline-path-1"
              ></path>
              <rect
                x="17"
                y="27"
                width="2"
                height="2"
                className="clr-i-outline clr-i-outline-path-2"
              ></rect>
            </svg>
          }
        />
        <Feature
          text={featureText("cloudStrategy")}
          icon={
            <svg
              viewBox="0 0 36 36"
              width="24"
              height="24"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M6.32,11.11H7.84L8,10.24A7.19,7.19,0,0,1,15.07,4h.07a7.15,7.15,0,0,1,4.71,1.83,11.1,11.1,0,0,1,3.09.64A9.18,9.18,0,0,0,15.16,2h-.09A9.2,9.2,0,0,0,6.13,9.11,6.15,6.15,0,0,0,2.33,19.95,8.09,8.09,0,0,1,3,17.71a4.12,4.12,0,0,1-.81-2.44A4.16,4.16,0,0,1,6.32,11.11Z"
                className="clr-i-outline clr-i-outline-path-1"
              ></path>
              <path
                d="M10.4,16.91h1.52L12,16a7.19,7.19,0,0,1,7.12-6.25h.07a7.17,7.17,0,0,1,5.7,2.92,11.05,11.05,0,0,1,2.72.77,9.2,9.2,0,0,0-8.4-5.69h-.09a9.2,9.2,0,0,0-8.94,7.12,6.15,6.15,0,0,0-3.64,11,8.11,8.11,0,0,1,.79-2,4.14,4.14,0,0,1,3-7Z"
                className="clr-i-outline clr-i-outline-path-2"
              ></path>
              <path
                d="M32.42,24.47v-.62a9.18,9.18,0,0,0-18.13-2.16A6.16,6.16,0,0,0,14.48,34H31a4.88,4.88,0,0,0,1.46-9.53ZM31,32H14.48a4.16,4.16,0,1,1,0-8.32H16l.11-.87a7.19,7.19,0,0,1,7.12-6.25h.07a7.21,7.21,0,0,1,7.12,7.25v1c0,.07,0,.13,0,.2l-.07,1.11.94.11A2.88,2.88,0,0,1,31,32Z"
                className="clr-i-outline clr-i-outline-path-3"
              ></path>
            </svg>
          }
        />
        <Feature
          text={featureText("eCommerce")}
          icon={
            <svg
              viewBox="0 0 36 36"
              width="24"
              height="24"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="13.33"
                cy="29.75"
                r="2.25"
                className="clr-i-outline clr-i-outline-path-1"
              ></circle>
              <circle
                cx="27"
                cy="29.75"
                r="2.25"
                className="clr-i-outline clr-i-outline-path-2"
              ></circle>
              <path
                d="M33.08,5.37A1,1,0,0,0,32.31,5H11.49l.65,2H31L28.33,19h-15L8.76,4.53a1,1,0,0,0-.66-.65L4,2.62a1,1,0,1,0-.59,1.92L7,5.64l4.59,14.5L9.95,21.48l-.13.13A2.66,2.66,0,0,0,9.74,25,2.75,2.75,0,0,0,12,26H28.69a1,1,0,0,0,0-2H11.84a.67.67,0,0,1-.56-1l2.41-2H29.13a1,1,0,0,0,1-.78l3.17-14A1,1,0,0,0,33.08,5.37Z"
                className="clr-i-outline clr-i-outline-path-3"
              ></path>
            </svg>
          }
        />
        <Feature
          text={featureText("machineLearning")}
          icon={
            <svg
              viewBox="0 0 36 36"
              width="24"
              height="24"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16,25a6.9908,6.9908,0,0,1-5.833-3.1287l1.666-1.1074a5.0007,5.0007,0,0,0,8.334,0l1.666,1.1074A6.9908,6.9908,0,0,1,16,25Z" />
              <path d="M20,14a2,2,0,1,0,2,2A1.9806,1.9806,0,0,0,20,14Z" />
              <path d="M12,14a2,2,0,1,0,2,2A1.9806,1.9806,0,0,0,12,14Z" />
              <path d="M30,16V14H28V10a4.0045,4.0045,0,0,0-4-4H22V2H20V6H12V2H10V6H8a4.0045,4.0045,0,0,0-4,4v4H2v2H4v5H2v2H4v3a4.0045,4.0045,0,0,0,4,4H24a4.0045,4.0045,0,0,0,4-4V23h2V21H28V16ZM26,26a2.0023,2.0023,0,0,1-2,2H8a2.0023,2.0023,0,0,1-2-2V10A2.0023,2.0023,0,0,1,8,8H24a2.0023,2.0023,0,0,1,2,2Z" />
            </svg>
          }
        />
        <Feature
          text={featureText("marketing")}
          icon={
            <svg
              viewBox="0 0 36 36"
              width="24"
              height="24"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M18,2a15.92,15.92,0,0,0-4.25.59l.77,1.86a14.07,14.07,0,1,1-10,10l-1.86-.78A16,16,0,1,0,18,2Z"
                className="clr-i-outline clr-i-outline-path-1"
              ></path>
              <path
                d="M7.45,15.7a10.81,10.81,0,1,0,8.3-8.26L16.37,9A9.24,9.24,0,1,1,9,16.32Z"
                className="clr-i-outline clr-i-outline-path-2"
              ></path>
              <path
                d="M18,22.09a4.08,4.08,0,0,1-4-3.68l-1.63-.68c0,.09,0,.18,0,.27A5.69,5.69,0,1,0,18,12.31h-.24L18.43,14A4.07,4.07,0,0,1,18,22.09Z"
                className="clr-i-outline clr-i-outline-path-3"
              ></path>
              <path
                d="M8.2,13.34a.5.5,0,0,0,.35.15H12.2l5.37,5.37A1,1,0,0,0,19,17.44L13.53,12V8.51a.5.5,0,0,0-.15-.35L7.79,2.57a.5.5,0,0,0-.85.35v4H3a.5.5,0,0,0-.35.85Z"
                className="clr-i-outline clr-i-outline-path-4"
              ></path>
            </svg>
          }
        />
        <Feature
          text={featureText("qualityEngineering")}
          icon={
            <svg
              viewBox="0 0 36 36"
              width="24"
              height="24"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                className="clr-i-outline clr-i-outline-path-1"
                cx="23.56"
                cy="17.74"
                r="1.95"
              ></circle>
              <circle
                className="clr-i-outline clr-i-outline-path-2"
                cx="22.42"
                cy="25.88"
                r="1.58"
              ></circle>
              <circle
                className="clr-i-outline clr-i-outline-path-3"
                cx="12.86"
                cy="17.74"
                r="1.95"
              ></circle>
              <circle
                className="clr-i-outline clr-i-outline-path-4"
                cx="13.99"
                cy="25.88"
                r="1.58"
              ></circle>
              <path
                className="clr-i-outline clr-i-outline-path-5"
                d="M30.83,20H29a19.29,19.29,0,0,0-1.18-5.73l1.46-.79a1,1,0,0,0-.95-1.76l-3,1.64A17.65,17.65,0,0,1,27,20.72C27,27,23.8,31.23,18.8,31.62V15H17.2V31.62C12.22,31.21,9,27,9,20.72a17.74,17.74,0,0,1,1.73-7.34L7.7,11.72a1,1,0,0,0-.95,1.76l1.5.8A19.38,19.38,0,0,0,7.07,20H5.17a1,1,0,0,0,0,2H7.1a14.62,14.62,0,0,0,1.66,6.17L6.87,29.49A1,1,0,1,0,8,31.12l1.84-1.29A10.38,10.38,0,0,0,18,33.66a10.38,10.38,0,0,0,8.14-3.81L28,31.12a1,1,0,1,0,1.15-1.64l-1.86-1.3A14.61,14.61,0,0,0,28.94,22h1.89a1,1,0,0,0,0-2Z"
              ></path>
              <path
                className="clr-i-outline clr-i-outline-path-6"
                d="M11.51,5.36a1.67,1.67,0,0,0,1.07-.51A3.21,3.21,0,0,1,13.76,6a16.38,16.38,0,0,0-2.65,2.89,2,2,0,0,0,1.61,3.19H23.32A2,2,0,0,0,25.1,11a2,2,0,0,0-.17-2.1A16.34,16.34,0,0,0,22.25,6a3.21,3.21,0,0,1,1.17-1.11A1.68,1.68,0,1,0,23,3.27,4.77,4.77,0,0,0,21,5a5.81,5.81,0,0,0-2.93-1,5.83,5.83,0,0,0-3,1A4.77,4.77,0,0,0,13,3.27a1.68,1.68,0,1,0-1.49,2.09ZM18,6.07c1.45,0,3.53,1.57,5.31,4h0l-10.6,0C14.49,7.63,16.56,6.07,18,6.07Z"
              ></path>
            </svg>
          }
        />
        <Feature
          text={featureText("softwareEngineering")}
          icon={
            <svg
              viewBox="0 0 36 36"
              width="24"
              height="24"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,7H32V9.2H4ZM4,29V10.8H32V29Z"
                className="clr-i-outline clr-i-outline-path-1"
              ></path>
              <rect
                x="17"
                y="23"
                width="6"
                height="2"
                className="clr-i-outline clr-i-outline-path-2"
              ></rect>
              <polygon
                points="7 15.68 13.79 18.8 7 21.91 7 24.11 16.6 19.7 16.6 17.89 7 13.48 7 15.68"
                className="clr-i-outline clr-i-outline-path-3"
              ></polygon>
            </svg>
          }
        />
        <Feature
          text={featureText("systemsDesign")}
          icon={
            <svg
              viewBox="0 0 36 36"
              width="24"
              height="24"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M33.53,18.76,26.6,15.57V6.43A1,1,0,0,0,26,5.53l-7.5-3.45a1,1,0,0,0-.84,0l-7.5,3.45a1,1,0,0,0-.58.91v9.14L2.68,18.76a1,1,0,0,0-.58.91v9.78h0a1,1,0,0,0,.58.91l7.5,3.45a1,1,0,0,0,.84,0l7.08-3.26,7.08,3.26a1,1,0,0,0,.84,0l7.5-3.45a1,1,0,0,0,.58-.91h0V19.67A1,1,0,0,0,33.53,18.76Zm-2.81.91L25.61,22,20.5,19.67l5.11-2.35ZM18.1,4.08l5.11,2.35L18.1,8.78,13,6.43ZM10.6,17.31l5.11,2.35L10.6,22,5.49,19.67Zm6.5,11.49-6.5,3-6.5-3V21.23L10.18,24A1,1,0,0,0,11,24l6.08-2.8ZM11.6,15.57h0V8l6.08,2.8a1,1,0,0,0,.84,0L24.6,8v7.58h0l-6.5,3ZM32.11,28.81l-6.5,3-6.51-3V21.22L25.19,24A1,1,0,0,0,26,24l6.08-2.8Z"
                className="clr-i-outline clr-i-outline-path-1"
              ></path>
            </svg>
          }
        />

        <Feature
          text={featureText("webHosting")}
          icon={
            <svg
              viewBox="0 0 36 36"
              width="24"
              height="24"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                className="clr-i-outline clr-i-outline-path-1"
                x="6"
                y="9"
                width="2"
                height="2"
              ></rect>
              <rect
                className="clr-i-outline clr-i-outline-path-2"
                x="10"
                y="9"
                width="14"
                height="2"
              ></rect>
              <rect
                className="clr-i-outline clr-i-outline-path-3"
                x="6"
                y="17"
                width="2"
                height="2"
              ></rect>
              <rect
                className="clr-i-outline clr-i-outline-path-4"
                x="10"
                y="17"
                width="14"
                height="2"
              ></rect>
              <path
                className="clr-i-outline clr-i-outline-path-5"
                d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,7H32v6H4Zm0,8H32v6H4ZM4,29V23H32v6Z"
              ></path>
              <rect
                className="clr-i-outline clr-i-outline-path-6"
                x="6"
                y="25"
                width="2"
                height="2"
              ></rect>
              <rect
                className="clr-i-outline clr-i-outline-path-7"
                x="10"
                y="25"
                width="14"
                height="2"
              ></rect>
            </svg>
          }
        />

        <Feature
          text={featureText("webManagement")}
          icon={
            <svg
              viewBox="0 0 36 36"
              width="24"
              height="24"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M26.54,18a19.38,19.38,0,0,0-.43-4h3.6a12.3,12.3,0,0,0-.67-1.6H25.69A19.72,19.72,0,0,0,22.8,6.53a12.3,12.3,0,0,0-2.55-.76,17.83,17.83,0,0,1,3.89,6.59H18.75V5.6c-.25,0-.51,0-.77,0s-.49,0-.73,0v6.77H11.86a17.83,17.83,0,0,1,3.9-6.6,12.28,12.28,0,0,0-2.54.75,19.72,19.72,0,0,0-2.91,5.85H6.94A12.3,12.3,0,0,0,6.26,14H9.89a19.38,19.38,0,0,0-.43,4,19.67,19.67,0,0,0,.5,4.37H6.42A12.34,12.34,0,0,0,7.16,24h3.23a19.32,19.32,0,0,0,2.69,5.36,12.28,12.28,0,0,0,2.61.79A17.91,17.91,0,0,1,12,24h5.26v6.34c.24,0,.49,0,.73,0s.51,0,.77,0V24H24a17.9,17.9,0,0,1-3.7,6.15,12.28,12.28,0,0,0,2.62-.81A19.32,19.32,0,0,0,25.61,24h3.2a12.34,12.34,0,0,0,.74-1.6H26A19.67,19.67,0,0,0,26.54,18Zm-9.29,4.37H11.51a17.69,17.69,0,0,1-.09-8.4h5.83Zm7.24,0H18.75V14h5.83A18.21,18.21,0,0,1,25,18,18.12,18.12,0,0,1,24.49,22.37Z"
                className="clr-i-outline clr-i-outline-path-1"
              ></path>
              <path
                d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z"
                className="clr-i-outline clr-i-outline-path-2"
              ></path>
            </svg>
          }
        />
        <Feature
          text={featureText("uiUxDesign")}
          icon={
            <svg
              viewBox="0 0 36 36"
              width="24"
              height="24"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon
                className="clr-i-outline clr-i-outline-path-1"
                points="9 17.41 9 27 18.59 27 16.59 25 11 25 11 19.41 9 17.41"
              ></polygon>
              <path
                className="clr-i-outline clr-i-outline-path-2"
                d="M34.87,32.29,32,29.38V32H4V27.85H6v-1.6H4V19.6H6V18H4V11.6H6V10H4V4.41L19.94,20.26V17.44L3.71,1.29A1,1,0,0,0,2,2V33a1,1,0,0,0,1,1H34.16a1,1,0,0,0,.71-1.71Z"
              ></path>
              <path
                className="clr-i-outline clr-i-outline-path-3"
                d="M24,30h4a2,2,0,0,0,2-2V8.7L27.7,4.47a2,2,0,0,0-1.76-1h0a2,2,0,0,0-1.76,1.08L22,8.72V28A2,2,0,0,0,24,30ZM24,9.2l1.94-3.77L28,9.21V24H24Zm0,16.43h4v2.44H24Z"
              ></path>
            </svg>
          }
        />
      </div>
    </div>
  );
};
