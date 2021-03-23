module.exports = {
  searchPlantCommon: async (req, res) => {
    const response = await fetch(
      `https://trefle.io/api/v1/plants?token=Gmg9IXKKoTDYSmtgxEG6-frzryOYamZfLPIncdW-LsU&filter[common_name]=${req.query}`
    );
    const json = await res.json(response);
    console.log(response);
  },
};
