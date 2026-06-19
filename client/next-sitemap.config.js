/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://hotaps.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
  },
}
