<!DOCTYPE html>
<html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Care Page</title>
      <link href="https://fonts.googleapis.com/css2?family=Encode+Sans:wght@100..900&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <?php 
      // first draft of reading/writing to db:
      // database config must be own file
      // connecting to database must be own file
      // phpinfo();
      // set vars
      $host = "localhost";
      $username = "test_a_user";
      $password = "1030501";
      $db = 'test_db';
      echo '<script>console.log("set vars")</script>';

      // create conneciton
      $dsn = "mysql:host=$host;dbname=$db;charset=UTF8";

      try {
        $pdo = new PDO($dsn, $username, $password);

        if ($pdo) {
          echo "<script>console.log('Connected to the $db database successfully!')</script>";
        }
      } catch (PDOException $e) {
        $rpt = $e->getMessage();
        echo "<script>console.log(\"$rpt\")</script>";
      }
    ?>

    <nav class="navbar">
        <div class="navbar-links">
            <a href="#" class="navbar-link">Home</a>
            <a href="#" class="navbar-link">Care</a>
            <a href="#" class="navbar-link">Login</a>
        </div>
    </nav>

    <?php
      // Query connection
      $sql_topics = "select * from topics";
      $topics_statement = $pdo->prepare($sql_topics);
      $topics_statement->execute();
      $data = $topics_statement->fetchAll(PDO::FETCH_ASSOC);
      if ($data) {
        foreach ($data as $topic) {
          echo "<h1 id=\"topicHeadline\">".$topic['headline']."</h1>";
          echo "<div class=\"card\">";
          echo "<div class=\"card-content\">";
          echo "<p class=\"description\" id=\"topicBody\">".$topic['body']."</p>";
          echo "</div>";
          echo "</div>";
          echo "<div class=\"buttons-container\">";
          echo "<button class=\"button careButton\">Care</button>";
          echo "<button class=\"button dontCareButton\">Don't Care</button>";
          echo "</div>";
        }
      } else {
        echo "<p>No topics found</p>";
      }
    ?>

    <script>
      // add event listeners to buttons
      let cB = document.querySelectorAll('.careButton');
      for(let i = 0; i < cB.length; i++) {
          cB[i].onclick = function() {
              alert('You cared about the topic!');
          }
      }
      let dCB = document.querySelectorAll('.dontCareButton');
      for(let i = 0; i < dCB.length; i++) {
          dCB[i].onclick = function() {
              alert('You did not care about the topic!');
          }
      }
    </script>

    <?php
      // close conneciton
      $dsn = null;
      $pdo = null;
      echo 'Connection closed';
      echo "<script>console.log('Connection closed')</script>";
    ?>
  </body>
</html>