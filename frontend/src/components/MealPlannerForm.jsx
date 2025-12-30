import { useState } from 'react';

const MealPlannerForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        current_weight: '',
        target_weight: '',
        goal: 'weight_loss',
        time_frame_weeks: '',
        dietary_restrictions: '',
        budget: 'moderate',
        activity_level: 'moderate',
        ingredients: '',
        calories_per_day: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ingredients: formData.ingredients ? formData.ingredients.split(',').map(s => s.trim()) : [],
            calories_per_day: formData.calories_per_day ? parseInt(formData.calories_per_day) : null,
            user_profile: {
                current_weight: parseFloat(formData.current_weight),
                target_weight: parseFloat(formData.target_weight),
                goal: formData.goal,
                time_frame_weeks: parseInt(formData.time_frame_weeks),
                dietary_restrictions: formData.dietary_restrictions ? formData.dietary_restrictions.split(',').map(s => s.trim()) : [],
                budget: formData.budget,
                activity_level: formData.activity_level,
            }
        };
        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit} className="card grid">
            <h2 style={{ marginTop: 0 }}>Your Profile</h2>

            <div className="grid grid-2">
                <div className="input-group">
                    <label>Current Weight (kg/lbs)</label>
                    <input type="number" name="current_weight" required onChange={handleChange} placeholder="e.g. 180" />
                </div>
                <div className="input-group">
                    <label>Target Weight (kg/lbs)</label>
                    <input type="number" name="target_weight" required onChange={handleChange} placeholder="e.g. 150" />
                </div>
            </div>

            <div className="grid grid-2">
                <div className="input-group">
                    <label>Goal</label>
                    <select name="goal" onChange={handleChange}>
                        <option value="weight_loss">Weight Loss</option>
                        <option value="weight_gain">Weight Gain</option>
                        <option value="maintain">Maintain</option>
                    </select>
                </div>
                <div className="input-group">
                    <label>Time Frame (weeks)</label>
                    <input type="number" name="time_frame_weeks" required onChange={handleChange} placeholder="e.g. 12" />
                </div>
            </div>

            <div className="input-group">
                <label>Ingredients Available (comma separated)</label>
                <textarea name="ingredients" onChange={handleChange} placeholder="e.g. chicken, rice, eggs, spinach" rows="3" />
            </div>

            <div className="grid grid-2">
                <div className="input-group">
                    <label>Dietary Restrictions</label>
                    <input type="text" name="dietary_restrictions" onChange={handleChange} placeholder="e.g. gluten-free, keto" />
                </div>
                <div className="input-group">
                    <label>Budget</label>
                    <select name="budget" onChange={handleChange}>
                        <option value="low">Low Cost</option>
                        <option value="moderate">Moderate</option>
                        <option value="luxury">Luxury</option>
                    </select>
                </div>
            </div>

            <button type="submit" className="btn" disabled={isLoading}>
                {isLoading ? 'Generating Plan...' : 'Generate My Meal Plan'}
            </button>
        </form>
    );
};

export default MealPlannerForm;
