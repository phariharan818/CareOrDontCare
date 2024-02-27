import mongoose from 'mongoose';
import NewsAPI from 'newsapi';

const newsapi = new NewsAPI('877b46ff0ecb4ceeba9ebcd0c04cd669');

const topicSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
});

const Topic = mongoose.model("Topic", topicSchema);

const populateFromAPI = async () => {
    try {
        const response = await newsapi.v2.topHeadlines({
            country: 'us',
            pageSize: 50,
        });
        
        // console.log("Response from News API:", response);

        const articles = response.articles.map(article => {
            const title = article.title.replace(/ - .*/, '').trim();
            return {
                title,
                description: article.description,
                url: article.url,
            };
        });
        

        await Topic.insertMany(articles);
        console.log("Articles populated from API successfully.");
    } catch (error) {
        console.error("Error populating articles from API:", error);
    }
}



const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect("mongodb+srv://phariha:phariha@cluster0.vdenqf5.mongodb.net/")
        console.log("Successfully connected to MongoDB.");
        await populateFromAPI();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export { connectDB, Topic };
