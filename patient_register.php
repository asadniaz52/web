<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
  <title>Patient Registration</title>
</head>
<body>
  <h2>Register Patient</h2>
  <form method="POST">
    Name: <input type="text" name="name"><br>
    Age: <input type="number" name="age"><br>
    Gender: <select name="gender"><option>Male</option><option>Female</option></select><br>
    <input type="submit" name="register" value="Register">
  </form>

  <?php
    if (isset($_POST['register'])) {
        $name = $_POST['name'];
        $age = $_POST['age'];
        $gender = $_POST['gender'];
        $sql = "INSERT INTO patients (name, age, gender) VALUES ('$name', $age, '$gender')";
        if ($conn->query($sql)) echo "Patient registered successfully.";
        else echo "Error: " . $conn->error;
    }
  ?>
</body>
</html>
