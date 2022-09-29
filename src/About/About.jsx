import Contact from "./Contact";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";

function About() {
  return (
    <>
    
      <Navbar active={1}/>
      <div className="about">
        <div className="apps h-screen flex justify-center">
          <div className="app__about flex flex-col justify-center text-left">
            <div>
              <h1>Who Am I?</h1>
              <p>Ayurveda Specialist Dr. Avinash Deodhar</p>
            </div>
            <div className="about__mar">
              <h1>Why Choose Ayurveda?</h1>
              <p>Ayurveda cures the root problem not just symptoms. It removes all the bacteria from body permanently. The holistic medicine aims to restore health by understanding the underlying causes of the diseases. It strives to attack the root causes and detoxifying, cleansing, strengthening body tissues (dhatus) and balancing bodily doshas, ensuring complete cure.</p>
            </div>
            <div className="about__mar">
              <h1>What Do We Provide?</h1>
              <p>We Provide medicines for following:</p><p>Acidity, Chest Burning, Constipation, Gastralgia(Indigestion), Ulcer, Hernia, Amoebic Dysentery, Diarrhoea, Anemia, Appetite, Urethritis, Piles Fissure, Blood Pressure, Diabetes, Bed wetting, Renai calculi, Gall stones, Liver Cirrhosis, Asthma, Bronchitis, (Cold), Cataract, Tonsils, Dental Dieses, Rheumatism & Arthritis, Sciatica, Spur, Spondylosis, Frozen shoulder, Lock Jaw, Varicose veins, Obesity, Herpes, Prostate, Migraine, Hair fall, Menses (irregular), Mentally. Retarded, Nervous debility, Dialysis</p>
            </div>
          </div>
          <div className="app__contact flex flex-col justify-center text-left">
            <h1 className="text-2xl font-semibold">Have Any Queries?</h1>
            <p className="app__p uppercase opacity-40 text-gray-500 text-xl font-semibold">Contact Us</p>
            <Contact />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default About;