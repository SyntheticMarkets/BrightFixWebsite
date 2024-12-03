import React, {
    useState,
    useEffect
} from "react";
import styles from "./ProductTour.module.scss";
import image1 from "./Images/1.png";
import image2 from "./Images/2.gif";
import image3 from "./Images/3.gif";
import classNames from "classnames";
import {
    GlobalStoreClass
} from "../../stores/GlobalStore";
import {
    trackEvent
} from "../utils";

const ProductTour = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [textVisible, setTextVisible] = useState(true);

    const images = [{
            text: "Jinno let's you see a live preview of the component you're working on",
            buttonText: `Wow That's cool! 😍`,
            img: "https://www.jinno.app/ProductTour/1.png",
        },
        {
            buttonText: `Awesome! 👏`,
            text: "Jinno highlights the relevant code line once you hover an element in the component and the other way around.",
            img: "https://www.jinno.app/ProductTour/2.gif",
        },
        {
            text: "Code with Jinno AI - Jinno can see what you see! you can ask it to code for you.",
            buttonText: `Let's Start 🚀🚀🚀`,
            img: "https://www.jinno.app/ProductTour/3.gif",
        },
    ];

    useEffect(() => {
        // Call the provided callback function once when the component mounts
        trackEvent("Product tour open");
    }, []);
    const clickOnNext = () => {
        setTextVisible(false); // Start the transition by hiding the text
        setTimeout(() => {
            const nextStep = currentIndex + 1;
            if (nextStep > images.length - 1) {
                GlobalStoreClass.setShowProductTour(false);
                return
            }

            trackEvent("Product tour click on move to steop " + (1 + nextStep));
            setCurrentIndex(nextStep);
            setTextVisible(true); // Show the text after changing the index
        }, 500); // Match the timeout with the CSS transition duration
    };

    const Image = images[currentIndex];
    return ( <
        div className = {
            styles.productTour
        } >
        <
        div className = {
            styles.background
        } > < /div>

        <
        div className = {
            styles.center
        } >
        <
        div className = {
            styles.container
        }
        style = {
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }
        } >
        <
        div className = {
            styles.imagesHolder
        } > {
            images.map((image, index) => ( <
                img style = {
                    {
                        left: currentIndex * -100 + "%"
                    }
                }
                className = {
                    styles.image
                }
                key = {
                    index
                }
                src = {
                    image.img
                }
                alt = {
                    `Step ${index + 1}`
                }
                />
            ))
        } <
        /div> <
        div className = {
            styles.dots
        } >
        <
        div className = {
            classNames(styles.dot, {
                [styles.dotActive]: currentIndex === 0,
            })
        } >
        < /div> <
        div className = {
            classNames(styles.dot, {
                [styles.dotActive]: currentIndex === 1,
            })
        } >
        < /div> <
        div className = {
            classNames(styles.dot, {
                [styles.dotActive]: currentIndex === 2,
            })
        } >
        < /div> <
        /div> <
        div className = {
            styles.text
        }
        style = {
            {
                opacity: textVisible ? 1 : 0,
                transition: "opacity 0.5s",
            }
        } >
        {
            Image.text
        } <
        /div> <
        button onClick = {
            clickOnNext
        }
        className = {
            styles.button
        } > {
            Image.buttonText
        } <
        /button> <
        /div> <
        /div> <
        /div>
    );
};

export default ProductTour;