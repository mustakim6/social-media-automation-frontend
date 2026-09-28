import AIProviders from "../components/home/AIProviders";
import ContentTypes from "../components/home/ContentTypes";
import Features from "../components/home/Features";
import FinalCTA from "../components/home/FinalCTA";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";

const Home = () => {
    return (
        <>
            <Hero />
            <HowItWorks />
            <ContentTypes/>
            <AIProviders/>
            <Features/>
            <FinalCTA/>
        </>
    );
};

export default Home;