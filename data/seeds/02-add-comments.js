exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("comment")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("comment").insert([
        {
          display_name: "Mehmet",
          body: "Kanala abone oldum, tesekkurler.",
          post_id: 1,
        },
        {
          display_name: "Veli",
          body: "React cok kullanisli, uygulama gelistirmek cok zevkli.",
          post_id: 2,
        },
        {
          display_name: "Huseyin",
          body: "Redux baslangicta karmasik ama cok kullanisli.",
          post_id: 3,
        },
      ]);
    });
};
