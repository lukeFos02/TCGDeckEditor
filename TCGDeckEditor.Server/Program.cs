using Microsoft.EntityFrameworkCore;
using TCGDeckEditor.Server;
using TCGDeckEditor.Server.Logic.Processors;
using TCGDeckEditor.Server.Logic.RequestMakers;
using TCGDeckEditor.Server.Logic.RequestSenders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("TCGDeckEditorDatabase")));
builder.Services.AddScoped<ISearchProcessor, SearchProcessor>();
builder.Services.AddScoped<ISearchRequestMaker, SearchRequestMaker>();
builder.Services.AddScoped<ISearchRequestSender, SearchRequestSender>();
builder.Services.AddScoped<IAccountProcessor, AccountProcessor>();
builder.Services.AddScoped<IDeckProcessor, DeckProcessor>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // allow any origin
    .AllowCredentials());

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
