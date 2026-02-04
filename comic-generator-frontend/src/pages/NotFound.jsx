import { useNavigate } from 'react-router-dom';
import { Home, Bomb } from 'lucide-react';
import Button from '../components/shared/Button';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center bg-slate-50">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75" />
                <div className="relative bg-white p-8 rounded-full shadow-lg border-4 border-black">
                    <Bomb className="w-16 h-16 text-red-600" />
                </div>
            </div>

            <h1 className="text-8xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4 drop-shadow-sm">
                404
            </h1>

            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-black max-w-md relative mb-8 transform rotate-1">
                <h2 className="text-2xl font-bold font-heading mb-2">PAGE NOT FOUND!</h2>
                <p className="text-gray-600 font-medium">
                    "Great Scott! It seems this page has been erased from the timeline!"
                </p>

                {/* Speech bubble tail */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] border-b-black" />
                <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-white" />
            </div>

            <Button onClick={() => navigate('/')} icon={Home} size="lg">
                Back to Home Base
            </Button>
        </div>
    );
}
