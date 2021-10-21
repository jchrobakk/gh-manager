Wybierz wersję README:
PL
EN
# Github Manager
Proste narzędzie wykonane jako zadanie w ramach mentoringu z devmentor.pl. Głownym celem jej stworzenia było wykorzystanie umiejętności pisania testów w praktyce.
Narzędzie wykorzystuje [API Githuba](https://docs.github.com/en/rest), aby pozyskiwac dane nt. użytkowników, repozytoriów oraz pozwala na edycję własnego profilu.

## Instalacja i konfiguracja
Jeżeli chcesz uzyć GHM w swoim projekcie wystarczy dodać do swojego projektu [ten plik](https://github.com/jchrobakk/task-js-testing/blob/master/src/githubManager.js). Po jego dodaniu wystarczy, że zaimportujesz klasę do pliku, w którym chcesz jej użyć. Przykładowo:

    import  GHManager  from  "./githubManager";
Następnie musisz stworzyć instancję klasy, podając jako argument swój personalny token konta Github. Jeżeli nie wiesz jak go stworzyć - zerknij [tutaj](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). Przykładowo:

    const  ghm  =  new  GHManager("ghp_mypersonaltoken");
Teraz możesz zweryfikować swój token:

    ghm.verifyToken();
Jeżeli twój token jest prawidłowy to żadne błędy nie powinny się pojawić. Teraz możesz zacząć korzystać z funkcji GHM.

*Jeżeli chcesz pobrać i używać całego projektu, wystarczy, że pobierzesz całe repozytorium, użyjesz w terminalu komendy npm i, stworzysz plik .env, a w nim umieścisz linijkę:
    SECRET=yourtokenhere
A w miejscu yourtokenhere wstawisz po prostu swój token personalny.*

## Używanie
### Pobieranie informacji z API
Metody, które służą do pobierania danych z API Githuba. Metody te zwracają promise, więc trzeba je obsłużyc za pomocą `.then()` lub za pomocą `async/await`.
#### .getUserInfo()
Zwraca informacje na temat użytkownika, którego nick przekażemy w parametrze. Przykładowo:

    const info = await ghm.getUserInfo('jchrobakk')
#### .getUserRepos()
Zwraca listę (array) wszystkich repozytoriów użytkownika, którego nick przekażemy jako argument. Przykładowo:

    const reposList = await ghm.getUserRepos('jchrobakk')
#### .getRepoinfo()
Zwraca informację na temat repozytoria, którego nazwę przekażemy w drugim argumencie. Pierwszym argumentem musi być nazwa użytkownika, do którego należy repozytorium. Przykładowo:

    const repoInfo = await ghm.getRepoInfo('jchrobakk', 'task-js-testing')
#### .getRepoIssues()
Zwraca listę błędów, danego repozytoria. Należy podać takie same argumenty jak w przypadku `.getRepoInfo()`. Przykładowo:

    const repoIssues = await ghm.getRepoInfo('jchrobakk', 'task-js-testing')
###  Edytowanie profilu
Metody, które pozwalają na edycję profilu.
