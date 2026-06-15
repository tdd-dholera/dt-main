import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PopupForm from "./FormThree";

export default function ButtonsSection() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formHeadline, setFormHeadline] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [formType, setFormType] = useState(""); 
  
  const openContactForm = (title, headline, btnName, type) => {
    setFormTitle(title);
    setFormHeadline(headline);
    setButtonName(btnName);
    setFormType(type);
    setIsContactFormOpen(true);
  };
  
  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };
  
  const handleAfterSubmit = () => {
    console.log("Form submitted successfully, type:", formType);
    
    if (formType === "brochure") {
      try {
        console.log("Initiating brochure download");
        
        // Using setTimeout to ensure the popup closes before download starts
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = 'https://shorturl.at/Dv00M'; 
          link.target = '_blank';
          link.download = 'brochure.pdf'; // Add download attribute
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log("Download link clicked");
        }, 300);
      } catch (error) {
        console.error("Error downloading brochure:", error);
        window.open('https://shorturl.at/Dv00M', '_blank');
      }
    }
  };

  const buttons = [
    {id: 1, title: "Download Brochure"},
    {id: 2, title: "Book Free Site Visit"} 
  ];

  return (
    <div className="buttons-container flex flex-wrap gap-4 md:gap-12 justify-center w-full py-4 md:text-xl">
      {buttons.map((button) => (
        <button 
          key={button.id}
          onClick={() => {
            if (button.id === 1) {
              openContactForm(
                "Download Brochure", 
                "Please fill out the form to download our brochure. Fields marked with * are mandatory.",
                "Download Now",
                "brochure" // Added this parameter
              );
            } else if (button.id === 2) {
              openContactForm(
                "Book Free Site Visit", 
                "Fill the form below to schedule a site visit. Fields marked with * are mandatory.", 
                "Submit",
                "siteVisit" // Added this parameter
              );
            }
          }}
          className="btn btn-primary px-6 py-3 bg-[#b69b5e] hover:bg-[#d3b66b] text-gray-800 font-semibold rounded-xl transition duration-300 w-full sm:w-auto max-w-xs"
        >
          {button.title}
        </button>
      ))}

      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-lg mx-auto"
            >
              <PopupForm
                title={formTitle} 
                headline={formHeadline}
                buttonName={buttonName} 
                onClose={closeContactForm}
                onSuccess={handleAfterSubmit}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}