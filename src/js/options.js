document.addEventListener("DOMContentLoaded", function() {
    var default_settings = chrome.extension.getBackgroundPage().DEFAULT_SETTINGS
    console.log(default_settings)

    chrome.storage.sync.get(default_settings, function(stored) {
        document.getElementById("host").value = stored.host
        document.getElementById("port").value = stored.port
    })

    document.getElementById("save").onclick = function() {
        chrome.storage.sync.set({
            host: document.getElementById("host").value,
            port: document.getElementById("port").value
        }, function(c) { 
            document.getElementById("saved-dialog").style.display = "block"
        })
    }

    var db = new Dexie("cookie_database")

    db.version(1).stores({
        cookies: "id,name,value,url"
    })


    db.cookies.each(function(cookie) {
        var tr = document.createElement("tr");
        var parts = [cookie.name, cookie.value, cookie.url]

        for(var i = 0; i < parts.length; i++) {
            var td = document.createElement("td")
            td.textContent = parts[i]
            tr.appendChild(td)
        }

        document.getElementById("cookie-log-body").appendChild(tr)
    })
})
