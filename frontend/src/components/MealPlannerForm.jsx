import { useState } from 'react';

const MealPlannerForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        current_weight: '',
        target_weight: '',
        goal: 'weight_loss',
        time_frame_weeks: '12', // default
        dietary_restrictions: [],
        budget: '120',
        ingredients: [],
        ingredientInput: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGoalChange = (val) => {
        setFormData({ ...formData, goal: val });
    };

    const handleDietaryToggle = (diet) => {
        const current = formData.dietary_restrictions;
        if (current.includes(diet)) {
            setFormData({ ...formData, dietary_restrictions: current.filter(d => d !== diet) });
        } else {
            setFormData({ ...formData, dietary_restrictions: [...current, diet] });
        }
    };

    const handleIngredientKeyDown = (e) => {
        if (e.key === 'Enter' && formData.ingredientInput.trim()) {
            e.preventDefault();
            setFormData({
                ...formData,
                ingredients: [...formData.ingredients, formData.ingredientInput.trim()],
                ingredientInput: ''
            });
        }
    };

    const removeIngredient = (idx) => {
        const newIngredients = [...formData.ingredients];
        newIngredients.splice(idx, 1);
        setFormData({ ...formData, ingredients: newIngredients });
    };

    const handleSubmit = () => {
        const payload = {
            ingredients: formData.ingredients,
            calories_per_day: null, // Let AI decide
            user_profile: {
                current_weight: parseFloat(formData.current_weight) || 0,
                target_weight: parseFloat(formData.target_weight) || 0,
                goal: formData.goal,
                time_frame_weeks: parseInt(formData.time_frame_weeks),
                dietary_restrictions: formData.dietary_restrictions,
                budget: `$${formData.budget} weekly`,
                activity_level: 'moderate',
            }
        };
        onSubmit(payload);
    };

    return (
        <div className="relative flex h-full w-full flex-col group/design-root overflow-x-hidden pb-24">
            {/* Header */}
            <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-background-light dark:bg-background-dark">
                <div className="flex flex-col items-center flex-1 pr-12">
                    <h2 className="text-[#0d1b11] dark:text-white text-4xl font-bold leading-tight tracking-[-0.015em] text-center">Personalize Plan</h2>
                </div>
            </div>

            {/* Headline */}
            <div className="flex flex-col px-4 pt-4 pb-2">
                <h2 className="text-[#0d1b11] dark:text-white tracking-tight text-[20px] font-bold leading-tight text-left">Let's build your plan.</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Tell us about your goals and constraints so we can curate the perfect menu.</p>
            </div>
            <div className="h-4"></div>

            {/* Goal Section */}
            <div className="flex flex-col px-4">
                <p className="text-[#0d1b11] dark:text-white text-base font-semibold leading-normal pb-3">What is your primary health goal?</p>
                <div className="flex w-full">
                    <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-[#e7f3ea] dark:bg-[#1a2e20] p-1">
                        {[
                            { label: 'Lose Fat', value: 'weight_loss' },
                            { label: 'Maintain', value: 'maintain' },
                            { label: 'Muscle', value: 'weight_gain' }
                        ].map((opt) => (
                            <label key={opt.value} className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-all ${formData.goal === opt.value ? 'bg-white dark:bg-[#2a4530] shadow-sm text-[#0d1b11] dark:text-white' : 'text-[#4c9a5f] dark:text-[#8bcfa3]'}`}>
                                <span className="truncate">{opt.label}</span>
                                <input
                                    className="invisible w-0 h-0 absolute"
                                    name="goal"
                                    type="radio"
                                    value={opt.value}
                                    checked={formData.goal === opt.value}
                                    onChange={() => handleGoalChange(opt.value)}
                                />
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div className="h-6"></div>

            {/* Stats Section */}
            <div className="flex flex-col px-4">
                <div className="flex justify-between items-center pb-3">
                    <p className="text-[#0d1b11] dark:text-white text-base font-semibold leading-normal">Your stats</p>
                    <div className="flex items-center bg-[#e7f3ea] dark:bg-[#1a2e20] rounded-lg p-0.5">
                        <button className="px-3 py-1 rounded-md text-xs font-bold bg-white dark:bg-[#2a4530] shadow-sm text-primary-dark">LBS</button>
                        {/* <button className="px-3 py-1 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400">KG</button> */}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Current Weight</label>
                        <div className="relative">
                            <input className="w-full h-14 bg-white dark:bg-[#1a2e20] border border-gray-200 dark:border-[#2a4530] rounded-xl px-4 text-lg font-semibold text-[#0d1b11] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-300" placeholder="0" type="number" name="current_weight" onChange={handleChange} value={formData.current_weight} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Target Weight</label>
                        <div className="relative">
                            <input className="w-full h-14 bg-white dark:bg-[#1a2e20] border border-gray-200 dark:border-[#2a4530] rounded-xl px-4 text-lg font-semibold text-[#0d1b11] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-300" placeholder="0" type="number" name="target_weight" onChange={handleChange} value={formData.target_weight} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Time Frame (weeks)</label>
                    <div className="relative">
                        <input className="w-full h-14 bg-white dark:bg-[#1a2e20] border border-gray-200 dark:border-[#2a4530] rounded-xl px-4 text-lg font-semibold text-[#0d1b11] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-300" placeholder="12" type="number" name="time_frame_weeks" onChange={handleChange} value={formData.time_frame_weeks} />
                    </div>
                </div>
            </div>
            <div className="h-6"></div>

            {/* Dietary Chips */}
            <div className="flex flex-col px-4">
                <p className="text-[#0d1b11] dark:text-white text-base font-semibold leading-normal pb-3">Dietary preferences</p>
                <div className="flex flex-wrap gap-2">
                    {['Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Gluten-Free', 'Dairy-Free'].map(diet => (
                        <label key={diet} className="cursor-pointer">
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={formData.dietary_restrictions.includes(diet)}
                                onChange={() => handleDietaryToggle(diet)}
                            />
                            <div className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${formData.dietary_restrictions.includes(diet) ? 'border-primary bg-primary/10 text-[#0d1b11] bg-primary border-primary' : 'border-gray-200 dark:border-[#2a4530] bg-white dark:bg-[#1a2e20] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#253f2b]'}`}>
                                {diet}
                            </div>
                        </label>
                    ))}
                </div>
            </div>
            <div className="h-6"></div>

            {/* Constraints */}
            <div className="flex flex-col px-4">
                <p className="text-[#0d1b11] dark:text-white text-base font-semibold leading-normal pb-3">Constraints</p>
                {/* Budget */}
                <div className="bg-white dark:bg-[#1a2e20] p-4 rounded-xl border border-gray-200 dark:border-[#2a4530] mb-4">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-medium text-[#0d1b11] dark:text-white">Weekly Budget</label>
                        <span className="text-primary font-bold text-lg">${formData.budget}</span>
                    </div>
                    <input class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" max="300" min="50" type="range" name="budget" value={formData.budget} onChange={handleChange} />
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span>$50</span>
                        <span>$300+</span>
                    </div>
                </div>

                {/* Ingredients */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Ingredients you have (optional)</label>
                    <div className="w-full bg-white dark:bg-[#1a2e20] border border-gray-200 dark:border-[#2a4530] rounded-xl px-4 py-3 min-h-[80px]">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {formData.ingredients.map((ing, idx) => (
                                <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-[#2a4530] text-gray-800 dark:text-gray-200">
                                    {ing}
                                    <button type="button" onClick={() => removeIngredient(idx)} className="ml-1.5 inline-flex items-center justify-center text-gray-400 hover:text-gray-600">
                                        <span className="material-symbols-outlined text-[14px]">close</span>
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            className="w-full bg-transparent text-sm text-[#0d1b11] dark:text-white focus:outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
                            placeholder="Type ingredient and hit enter..."
                            type="text"
                            name="ingredientInput"
                            value={formData.ingredientInput}
                            onChange={handleChange}
                            onKeyDown={handleIngredientKeyDown}
                        />
                    </div>
                </div>
            </div>
            <div className="h-20"></div>

            {/* Footer CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm z-20 border-t border-gray-100 dark:border-[#1a2e20]">
                <button onClick={handleSubmit} disabled={isLoading} className="w-full h-12 bg-primary hover:bg-green-400 active:scale-[0.98] transition-all rounded-xl text-[#0d1b11] font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
                    {isLoading ? 'Cheffing it up...' : 'Generate Meal Plan'}
                </button>
            </div>
        </div>
    );
};

export default MealPlannerForm;
