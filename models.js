import mongoose from 'mongoose';
import NewsAPI from 'newsapi';
import dotenv from 'dotenv'
dotenv.config()

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const topicSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    cared: { type: Boolean, default: false }
});

const Topic = mongoose.model("Topic", topicSchema);

const articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    made: { type: Date, default: Date.now },
    archived: { type: Boolean, default: false }
});

const Article = mongoose.model("Article", articleSchema);

const userSchema = new mongoose.Schema({
    name: String,
    caredArticles: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article' 
    }], 
    notCaredArticles: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article' 
    }]
});
const User = mongoose.model("User", userSchema);

const populateArticlesFromTopics = async () => {
    try {
        const a = await Article.find({}); // get article titles
        const aTitles = a.map(article => article.title);

        const topics = await Topic.find({}).exec(); // query for all topics
        let articles = topics.map(topic => { // re-set the 3 fields that match, leaving archived as false.
            if(aTitles.includes(topic.title)) {
                return null;
            } else {
                const g = {
                    title: topic.title,
                    description: topic.description,
                    url: topic.url,
                    urlToImage: topic.urlToImage
                };
                aTitles.push(topic.title);
                return g;
            }
        });
        articles = articles.filter(article => article !== null);
        await Article.insertMany(articles); // save the articles to the database
        console.log("articles populated from topics successfully");
    } catch (error) {
        console.error("error:", error);
    }
    // try {
    //     const a = await Article.find({});
    //     const articles = a.map(topic => { // re-set the 3 fields that match, leaving archived as false.
    //         const g = {
    //             title: topic.title,
    //             description: topic.description,
    //             url: topic.url,
    //         };
    //         return g;
    //     });
    //     await Article.insertMany(articles); // save the articles to the database
    //     console.log("articles populated from topics successfully");
    // } catch (error) {
    //     console.error("error:", error);
    // }
};

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
                urlToImage: article.urlToImage
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
        // await populateFromAPI();
        // await populateArticlesFromTopics();
    } catch (error) {
        console.error("error:", error)
    }
};

export { connectDB, Topic, User, Article };
