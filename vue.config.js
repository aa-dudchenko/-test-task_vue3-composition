module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/_vars.scss";
          @import "@/styles/_mixins.scss";
          `,
      },
    },
  },
};