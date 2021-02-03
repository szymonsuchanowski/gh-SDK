# JavaScript: Testowanie

Twoim zadaniem jest stworzenie czegoś na pograniczu Klienta czy [SDK](https://pl.wikipedia.org/wiki/Software_development_kit) dla [GitHub API](https://docs.github.com/en/rest) czyli bibioteki, która utałwi korzystywanie z dostępych rozwiązń.

Chodzi o to, aby zamiast budować rozbudowane instrukcje typu:
```
const secret = 'secret-token';
const url = `https://api.github.com/repos/devmentor-pl/task-js-basics/collaborators/bogolubow`;
const promise = fetch(url, {
    method: 'PUT',
    credentials: 'same-origin',
    redirect: 'follow',
    headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${secret}`,
    },
    body: JSON.stringify({
        permission: 'pull'
    }),
});
```

Móc wykorzystać klasę, którą zbudujesz. Może się ona nazwyać np. `GitHubSDK`.
Jeśli odpowiednio zaimplementujesz metodę o nazwie `.sendInvitation()` to wystarczy wtedy wywołać:
```
const gh = new GitHubSDK('devmentor-pl', 'secret-token');
gh.sendInvitation('task-js-basics', 'bogolubow');
```

Wew. tej funkcji oczywiście będzie kod, który wstawiłem na samym początku jednak wtedy będziesz mógł go wykorzystać w wielu swoich projektach w wygodniejszy sposób. To pozwoli Ci zaoszczędzić sporo czasu i maksymalizować zyski.

> Zwróć uwagę, że w moim `fetch()` jest kilka dodatkowych opcji. Nie jest to związane z samym GitHub API. To opcje dostepne dla `fetch()` więcej możesz przeczytać na [javascript.info](https://javascript.info/fetch-api).

GitHub API posiada bardzo duże możliwości zarządzania kontem. To co robisz przy pomocy interfejsu, możesz również zrobić przy pomocy API, np.:

- pobrać informacje o użytkowniku ([dokumentacja](https://docs.github.com/en/rest/reference/users#get-a-user))
- pobrać informacje o repozytoriach ([dokumentajca](https://docs.github.com/en/rest/reference/repos#list-public-repositories))
- porbrać informacje o commitach w repozytorium ([dokumentacja](https://docs.github.com/en/rest/reference/repos#list-commits))
- pobrać informacje o komentarzach do commitów ([dokumentacja](https://docs.github.com/en/rest/reference/repos#list-commit-comments))
- poberać informacje o błędach w repozytorium ([dokumentacja](https://docs.github.com/en/rest/reference/issues#list-repository-issues))
- pobrać informacje o aktywności ([dokumentacja](https://docs.github.com/en/rest/reference/activity#list-repository-events))


> Chciałbym również, abyś zwrócił uwagę, że opis dokumentacji jest oparty o przykłady dla `curl`. To dość powszechne i uważane za uniwersalne rozwiązanie. Dlatego powinieneś umieć przełożyć te przykłady na JavaScript. W tym może Ci pomóc [ta dokumentacja](https://idratherbewriting.com/learnapidoc/docapis_understand_curl.html). 

Możesz również zarządzać swoim kontem jeśli [uwierzytelnisz](https://docs.github.com/en/rest/guides/basics-of-authentication) swoje zapytanie. Najprościej jest to zrobić [generując odpowiedni token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). Następnie w nagłówku przesyłając jego zawartość tak jak w przykładzie na samym początku.

Jak widzisz jest mnóstwo możliwości. Ty powinieneś wybrać minimalną funkcjonalność dla swojej biblioteki. Taką, która umożliwi Ci jś wykorzystać do tworzenia własnego portofio. Portfolio, które samo się aktualizuje czerpiąc dane o projektach ze swojego konta GitHub.

Biblioteka powinna być sworzona zgodnie z metodyką TDD czyli red-green-refaktor. Napierw piszesz testy, które musisz sam skonfigurować. Potem dopiero piszesz implementację. Niech Twoje testy określają jaką funkcjonalność będzie posiadać Twoja biblioteka.

Pamiętaj, że najprościej jest napisać rozwiązanie pod konkretny przypadek, a dopiero potem kombinować z parametrami funkcji. Zgodnie z krokami: 

- RED: napisanie testu
- GREEN: implementacja konkretnego przypadku
- REFACTOR: uogólnienie rozwiązania

> **Uwaga!** Ponownie rozmyślnie łamiemy zasadę [FIRST](https://devszczepaniak.pl/testy-jednostkowe-first/). Tym razem w punkcie *Isolated* a nawet *Fast*. Będziemy wykonywać testy na żywym organiźmie tj. metoda do wysyłania zaproszenia będzie faktycznie wysyłać zaproszenie czyli nasze testy będą komunikowac się z API. Ten problem znów jest rozwiązywany przez [Mocki](https://devenv.pl/jest-sposoby-mockowania/), które będziemy omawiać w późniejszym terminie.

Zadaniem dodatkowym (na teraz lub potem) będzie stworzenie przynajmniej szkieletu "samoaktualizującego się" portfolio, które na pewno zostanie docenione przez Twojego potencjalnego pracodawcę.

PS. Aby móc testować zapytania do API przy użyciu `fetch()` musisz mieć zainstalowany np. `node-fetch` ([StackOverflow](https://stackoverflow.com/questions/48433783/referenceerror-fetch-is-not-defined)). Pamiętaj, aby zaimportować i przypisać do odpowiedniego elementu np. `global.fetch = require("node-fetch");`.












