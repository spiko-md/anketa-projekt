
public class User
{
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
    public string DisplayName { get; set; } = "";
}

public class UserStore
{
    public List<User> Users { get; } = new()
    {
        new User { Username = "ana", Password = "1234", DisplayName = "Ana Novak" },
        new User { Username = "marko", Password = "abcd", DisplayName = "Marko Zajc" }
    };

    public User? Validate(string username, string password) =>
        Users.FirstOrDefault(u => u.Username == username && u.Password == password);
}
