## API Erişim Noktaları

    API Erişim Adresi: https://react-yazi-yorum.herokuapp.com/
    Postman Collection: https://www.getpostman.com/collections/702cbcc6cb3a353fdf12

|  Metod | Erişim Noktası                 | Açıklama                                                                                                                                                                      |
| -----: | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    GET | `/posts`                       | Veritabanındaki tüm yazıları dizi olarak döndürür. Sistemde hiç yazı olmaması durumunda boş dizi döndürür.                                                                    |
|    GET | `/posts/:id`                   | Verilen `id` değeriyle eşleşen yazı objesi döndürür. Eşleşme olmadığında hata objesi döndürür.                                                                                |
|    GET | `/posts/latest-comments`       | Veritabanındaki tüm yazılara gelen son 10 yorumu döndürür. Yorum olmadığında boş dizi döndürür.                                                                               |
|    GET | `/posts/:post_id/comments`     | Belirtilen yazı `id`'ye ait yorumları döndürür. Hiç yorum olmaması durumunda boş dizi döndürür.                                                                               |
|   POST | `/posts`                       | Veritabanına yazı girişi buradan yapılır. `title` ve `content` alanları zorunludur. Giriş başarılı olduysa girilen yazı objesini döndürür.                                    |
|   POST | `/posts/:post_id/comments`     | Veritabanına yorum girişi buradan yapılır. `display_name` ve `body` alanları zorunludur. Giriş başarılı olduysa girilen yorum objesini döndürür.                              |
|    PUT | `/posts/:id`                   | Veritabanındaki yazıların düzenlenmesi buradan yapılır. `title` ve `content` üzerindeki değişiklikler başarılı olduysa güncellenen yazı objesini döndürür.                    |
|    PUT | `/posts/:post_id/comments/:id` | Veritabanındaki yorumların düzenlenmesi buradan yapılır. `body` üzerindeki değişiklikler başarılı olduysa güncellenen yorum objesini döndürür. `display_name` değiştirilemez. |
| DELETE | `/posts/:id/`                  | Veritabanındaki yazıların silinmesi buradan yapılır. Silinme işlemi başarılı olduğunda HTTP durum kodu `204` döndürülür.                                                      |  |
| DELETE | `/posts/:post_id/comments/:id` | Veritabanındaki yorumların silinmesi buradan yapılır. Silinme işlemi başarılı olduğunda HTTP durum kodu `204` döndürülür.                                                     |  |
