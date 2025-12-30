import { useState } from 'react';
import MealPlannerForm from './components/MealPlannerForm';
import MealPlanDisplay from './components/MealPlanDisplay';
import { generateMealPlan } from './api';

function App() {
    const [mealPlan, setMealPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [view, setView] = useState('form'); // 'form' or 'plan'

    const handleGenerate = async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateMealPlan(data);
            setMealPlan(result);
            setView('plan');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || "Failed to generate plan. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        setView('form');
        setMealPlan(null);
    };

    if (view === 'plan' && mealPlan) {
        return (
            <div className="relative flex h-full min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark text-[#0d1b11] dark:text-white font-display">
                {/* Top App Bar */}
                <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-20">
                    <div onClick={handleBack} className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors">
                        <span className="material-symbols-outlined text-2xl text-[#0d1b11] dark:text-white">arrow_back</span>
                    </div>
                    <h2 className="text-[#0d1b11] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Meal Plan</h2>
                    <div className="flex w-12 items-center justify-end">
                        {/* Placeholder for settings */}
                    </div>
                </div>

                <MealPlanDisplay planData={mealPlan} />
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#0d1b11] dark:text-[#f0f0f0] antialiased font-display min-h-screen">
            {error && (
                <div className="fixed top-4 left-4 right-4 z-50 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                    <button onClick={() => setError(null)} className="float-right font-bold ml-2">X</button>
                </div>
            )}
            <MealPlannerForm onSubmit={handleGenerate} isLoading={isLoading} />
        </div>
    );
}

export default App;
