import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import SampleShowcase from '../components/home/SampleShowcase';

export default function Home() {
    return (
        <div className="flex flex-col w-full">
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <SampleShowcase />
        </div>
    );
}
