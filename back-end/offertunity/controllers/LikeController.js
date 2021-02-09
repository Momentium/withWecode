const { CompanyService, UserService, LikeService } = require("../services");
const { errorWrapper, errorGenerator } = require("../errors");
const { calcYear } = require('../utils')


const getLikeStartups = errorWrapper(async (req, res) => {
    const [likedStartups, num] = await LikeService.findLikedStartups(req.query, req.foundUser.id)

    const startups = []
    if (!(likedStartups.length === 0)) {
        for (let len = 0; len<likedStartups.length; len++) {
            startups.push({})
            startups[len].id = likedStartups[len].id;
            startups[len].company_id = likedStartups[len].company_id;
            startups[len].name = likedStartups[len].companies.name;
            startups[len].thumbnail = likedStartups[len].companies.startups[0].thumbnail;
            startups[len].description = likedStartups[len].companies.description;
            startups[len].tag = []
            if (likedStartups[len].companies.startups[0].sector_id) {
                startups[len].tag.push(await CompanyService.findInfoName('sectors', likedStartups[len].companies.startups[0].sector_id))
            }
            if (likedStartups[len].companies.startups[0].core_technology_id) {
                startups[len].tag.push(await CompanyService.findInfoName('technologies', likedStartups[len].companies.startups[0].core_technology_id))
            }
            if (likedStartups[len].companies.startups[0].investment_series_id) {
                startups[len].tag.push(await CompanyService.findInfoName('investment_series', likedStartups[len].companies.startups[0].investment_series_id))
            }
            if (likedStartups[len].companies.established_date) {
                startups[len].tag.push(await calcYear(likedStartups[len].companies.established_date))
            }
        }
    }

    await res.status(200).json({
        startups, num
    })
})

module.exports = {
    getLikeStartups
};
  