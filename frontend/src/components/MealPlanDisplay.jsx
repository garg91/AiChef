const MealPlanDisplay = ({ planData }) => {
    if (!planData) return null;

    return (
        <div className="card" style={{ marginTop: '2rem' }}>
            <h2>Your Personalized AI Chef Plan</h2>

            <div style={{ margin: '1.5rem 0', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--accent)' }}>
                <h3 style={{ marginTop: 0 }}>Chef's Advice</h3>
                <p>{planData.advice}</p>
            </div>

            <div className="plan-grid">
                {planData.plan.map((day, idx) => (
                    <div key={idx} style={{ marginBottom: '2rem' }}>
                        <h3>{day.day} <span style={{ fontSize: '0.8em', color: 'var(--text-secondary)', fontWeight: 400 }}>({day.total_calories} kcal)</span></h3>

                        <div className="grid grid-2">
                            {day.meals.map((meal, mIdx) => (
                                <div key={mIdx} className="meal-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <h4 style={{ margin: 0, color: 'var(--accent)' }}>{meal.name}</h4>
                                        <span style={{ fontSize: '0.9rem', background: 'var(--bg-primary)', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                                            {meal.calories} kcal
                                        </span>
                                    </div>
                                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        <strong>Ingredients:</strong> {meal.ingredients.join(', ')}
                                    </p>
                                    <p style={{ margin: 0, fontSize: '0.95rem' }}>
                                        {meal.recipe_instructions}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MealPlanDisplay;
