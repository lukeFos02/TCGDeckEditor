using System.Net.Mime;
using Newtonsoft.Json;

namespace TCGDeckEditor.Server.Models;

[Serializable]
public class Card
{
    [JsonProperty("id")]
    public string? Id { get; set; }
    [JsonProperty("code")]
    public string? Code { get; set; }
    [JsonProperty("rarity")]
    public string? Rarity { get; set; }
    [JsonProperty("type")]
    public string? Type { get; set; }
    [JsonProperty("name")]
    public string? Name { get; set; }
    [JsonProperty("images")]
    public Images? Images { get; set; }
    [JsonProperty("cost")]
    public int? Cost { get; set; }
    [JsonProperty("attribute")]
    public Attribute? Attribute { get; set; }
    [JsonProperty("power")]
    public int? Power { get; set; }
    [JsonProperty("color")]
    public string? Color { get; set; }
    [JsonProperty("family")]
    public string? Family  { get; set; }
    [JsonProperty("ability")]
    public string? Ability { get; set; }
    [JsonProperty("trigger")]
    public string? Trigger  { get; set; }
    [JsonProperty("set")]
    public Set? Set { get; set; }
}

[Serializable]
public class Images
{
    [JsonProperty("small")]
    public string? Small { get; set; }
    [JsonProperty("large")]
    public string? Large { get; set; }
}

[Serializable]
public class Attribute
{
    [JsonProperty("name")]
    public string? Name { get; set; }
    [JsonProperty("image")]
    public string? Image { get; set; }
}

[Serializable]
public class Set
{
    [JsonProperty("name")]
    public string? Name { get; set; }
}