
const MealPlanDisplay = ({ planData }) => {
    if (!planData || !planData.plan || planData.plan.length === 0) return null;

    // Assume single day for now or take the first one
    const dayPlan = planData.plan[0];

    return (
        <div className="px-4 pt-6 pb-24 space-y-6">
            {/* Advice Header */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
                <h2 className="text-[#0d1b11] dark:text-white tracking-light text-xl font-bold leading-tight mb-2">Chef's Advice</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{planData.advice}</p>
            </div>

            {/* Nutrition Dashboard */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
                <h2 className="text-[#0d1b11] dark:text-white tracking-light text-xl font-bold leading-tight mb-4">Daily Targets</h2>
                {/* Calories Progress */}
                <div className="flex flex-col gap-2 mb-6">
                    <div className="flex gap-6 justify-between items-end">
                        <p className="text-[#0d1b11] dark:text-gray-200 text-sm font-medium leading-normal">Calories</p>
                        <p className="text-green-700 dark:text-primary text-xs font-bold leading-normal bg-primary/10 px-2 py-1 rounded">{dayPlan.total_calories} kcal</p>
                    </div>
                    <div className="rounded-full bg-gray-100 dark:bg-gray-700 h-3 overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: '75%' }}></div>
                    </div>
                </div>
                {/* Macros Stats (Static for now as backend doesn't return them yet) */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1 rounded-lg p-3 bg-primary/10 dark:bg-white/5 items-center justify-center text-center">
                        <p className="text-green-800 dark:text-primary text-xs font-semibold uppercase tracking-wider">Protein</p>
                        <p className="text-[#0d1b11] dark:text-white tracking-light text-lg font-bold leading-tight">--</p>
                    </div>
                    <div className="flex flex-col gap-1 rounded-lg p-3 bg-primary/10 dark:bg-white/5 items-center justify-center text-center">
                        <p className="text-green-800 dark:text-primary text-xs font-semibold uppercase tracking-wider">Fat</p>
                        <p className="text-[#0d1b11] dark:text-white tracking-light text-lg font-bold leading-tight">--</p>
                    </div>
                    <div className="flex flex-col gap-1 rounded-lg p-3 bg-primary/10 dark:bg-white/5 items-center justify-center text-center">
                        <p className="text-green-800 dark:text-primary text-xs font-semibold uppercase tracking-wider">Carbs</p>
                        <p className="text-[#0d1b11] dark:text-white tracking-light text-lg font-bold leading-tight">--</p>
                    </div>
                </div>
            </div>

            {/* Meals Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#0d1b11] dark:text-white text-lg font-bold">Today's Meals</h3>
                </div>
                <div className="flex flex-col gap-4">
                    {dayPlan.meals.map((meal, idx) => (
                        <div key={idx} className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-card-light dark:bg-card-dark shadow-sm transition-all hover:shadow-md">
                            <div className="flex p-3 gap-4">
                                {/* Placeholder Image */}
                                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                                    <div className="h-full w-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs text-center p-1">
                                        Meal Image
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col justify-between py-1">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">MEAL {idx + 1}</p>
                                        <h4 className="text-base font-bold text-[#0d1b11] dark:text-white leading-tight mb-1 line-clamp-2">{meal.name}</h4>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300 font-medium">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                                            {meal.calories} kcal
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 pb-3">
                                <p className="text-xs text-gray-500">{meal.recipe_instructions}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MealPlanDisplay;
