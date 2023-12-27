const TitleBasics = require('../../models/titlebasics')
const TitleAkas = require('../../models/titleakas')
const TitlePrincipals = require('../../models/titleprincipals')
const TitleRatings = require('../../models/titleratings')
const NameBasics = require('../../models/namebasics')

exports.SearchTitle = async (req, res) => {
    try {
      const titlePart = req.body.titlePart;
        
      // Validate the input
      if (!titlePart) {
        return res.status(400).json({ error: 'Missing titlePart parameter' });
      }
    
      // Perform the database query to find titles matching the partial title
      const results = await TitleBasics.find({ primaryTitle: { $regex: titlePart } });
      
      if (!results || results.length === 0) {
        return res.status(404).json({
            message: 'No titles found for the provided search term'
        });
      }

      //Construction of the list of Objects
      const response = await Promise.all(results.map(async (result) => {
      
        const akas = await TitleAkas.find({ titleId: result.tconst }).exec();
        const akaList = akas ? akas.map(aka => ({
          akaTitle: aka.title,
          regionAbbrev: aka.region
        })) : [];

        const titleprincipals = await TitlePrincipals.find({ tconst: result.tconst }).select('nconst category').exec();
        const principalList = await Promise.all(
          titleprincipals ? 
          titleprincipals.map(async (titleprincipal) => {
            const principal = await NameBasics.findOne({ nconst: titleprincipal.nconst }).exec();
            return {
                nameID: principal.nconst,
                name: principal.primaryName,
                category: titleprincipal.category
            };
          }) : []
        );
        const rating = await TitleRatings.findOne({ tconst: result.tconst }).exec();
        
        const ratingObject = rating 
        ? { avRating: rating.averageRating, nVotes: rating.numVotes }
        : { avRating: "",  nVotes: "" };

        const genreList = result.genres.split(',').map(genre => ({ genreTitle: genre.trim() }));
        
        return {
            titleID: result.tconst,
            type: result.titleType,
            originalTitle: result.originalTitle,
            titlePoster: result.img_url_asset,
            startYear: result.startYear,
            genres: genreList,
            titleAkas: akaList,
            principals: principalList,
            rating: ratingObject
        };
      }));

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'SearchTitle: Internal Server Error' });
    }
}