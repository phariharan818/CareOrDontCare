import mongoose from 'mongoose';
import NewsAPI from 'newsapi';
import dotenv from 'dotenv'
dotenv.config()

const newsapi = new NewsAPI('877b46ff0ecb4ceeba9ebcd0c04cd669');

const topicSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    cared: { type: Boolean, default: false }
});

const Topic = mongoose.model("Topic", topicSchema);

const populateFromAPI = async () => {
    try {
        const response = await newsapi.v2.topHeadlines({
            country: 'us',
            pageSize: 100,
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
        console.log("articles populated from API successfully");
    } catch (error) {
        console.error("error:", error);
    }
}


const connectDB = async () => {
    try {
        console.log("connecting to mongodB")
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("successfully connected to mongodb")
        await populateFromAPI();
    } catch (error) {
        console.error("error:", error)
    }
};

export { connectDB, Topic };
