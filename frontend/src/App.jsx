import { useState } from 'react';
import MealPlannerForm from './components/MealPlannerForm';
import MealPlanDisplay from './components/MealPlanDisplay';
import { generateMealPlan } from './api';

function App() {
    const [mealPlan, setMealPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateMealPlan(data);
            setMealPlan(result);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || "Failed to generate plan. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <header style={{ textAlign: 'center' }}>
                <h1>AI Chef</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
                    Your nutritional optimist & personalized meal planner
                </p>
            </header>

            <main>
                <MealPlannerForm onSubmit={handleGenerate} isLoading={isLoading} />

                {error && (
                    <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#fda4af', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <MealPlanDisplay planData={mealPlan} />
            </main>

            <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <p>&copy; {new Date().getFullYear()} AI Chef. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
