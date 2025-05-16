// Get navigation data (categories, topics, cases)
function getNavigationData() {
    const categories = getPromptCategories();
    const navigation = [];

    for (const category of categories) {
        const topics = getTopicsByCategory(category);
        const topicData = [];

        for (const topic of topics) {
            const cases = getCasesByTopic(category, topic);
            topicData.push({
                name: topic,
                cases: cases
            });
        }
        navigation.push({
            name: category,
            topics: topicData
        });
    }

    return navigation;

}