class Destination {
    constructor(l, pj, pstrl) {
        this.lieu = l;
        this.prix_j = pj;
        this.strLieu = pstrl;
    }
}

class Utilisateur {
    constructor(x, password, resa) {
        this.userName = x
        this.pswUser = password
        this.panier = resa
    }
}

class Voyage {
    constructor(Pdest, Pprénom, Pnom, Pemail, Ptel, Pdatedep, Pdateret, Pnbradult, Pnbrenfant, Pptdj) {
            this.dest = Pdest;
            this.prénom = Pprénom;
            this.nom = Pnom;
            this.email = Pemail;
            this.tel = Ptel;
            this.datedep = Pdatedep;
            this.dateret = Pdateret;
            this.nbradult = Pnbradult ? Pnbradult : 0;
            this.nbrenfant = Pnbrenfant ? Pnbrenfant : 0;
            this.ptdj = Pptdj

        }
        /*methode nb jours*/

}

let tabDestinations = [
    new Destination("New York", 200),
    new Destination("Rio de Janeiro", 25),
    new Destination("Le Caire", 50),
    new Destination("Tokyo", 300),
    new Destination("Shanghai", 100),
    new Destination("Singapour", 400),
]

var VarVoyage = new Voyage();


function TitreResv() { //définis la destination et donne les paramètres de celle-ci pour le calcul du prix
    let DestChoisie = new URLSearchParams(window.location.search).get("destination");
    document.getElementById("Choix_User").innerHTML = 'Votre voyage à ' + DestChoisie;
    for (let val of tabDestinations) {
        if (val.lieu == DestChoisie) {
            VarVoyage.dest = val;

        }
    }
}

let listeUser = [ // liste des utilisateurs et de leur mdp
    new Utilisateur("gab", "abc", []),
    new Utilisateur("guillaume", "bcd", []),
    new Utilisateur("vincent", "cde", []),
    new Utilisateur("marc", "def", []),

]

var VarUtilisateur = new Utilisateur();
let connect = 0;


function ButtonDeco() {
    sessionStorage.removeItem("ConnectState");
    document.location.reload(true);
}


function identification() { /// sert à s'identifier et vérifier le bon username et mdp
    PuserName = document.getElementById("usrname").value;
    Ppswuser = document.getElementById("psw").value;
    for (let y of listeUser) {
        if (y.userName == PuserName && y.pswUser == Ppswuser) {
            connect = 1;
        }
    }
    if (connect == 1) {
        alert("Vous êtes connecté");
        document.getElementById("connexion").innerHTML = "Connecté";
        document.getElementById("deconnexion").style.display = "block";
        sessionStorage.setItem("ConnectState", "1");
    } else {
        alert("Vous n'êtes pas connecté");
    }
}

function isConnect() {
    if (sessionStorage.getItem("ConnectState") !== 'undefined') {
        if (sessionStorage.getItem("ConnectState") == "1") {
            document.getElementById("connexion").innerHTML = "Connecté";
            document.getElementById("deconnexion").style.display = "block";
        }
    } else {
        document.getElementById("deconnexion").style.display = "none";
    }
}

///faire afficher la page panier avec les destinations etc et le compte perso

function validerResa() {
    if (connect == 1) {

    }
}

function fcalcul() {
    document.getElementById("BoutonEnvoi").disabled = false;
    VarVoyage.nbradult = parseInt(document.getElementById("nbadult").value);
    VarVoyage.nbrenfant = parseInt(document.getElementById("nbenf").value);


    VarVoyage.nom = document.getElementById("name").value;
    VarVoyage.prénom = document.getElementById("surname").value;
    VarVoyage.tel = document.getElementById("tel").value;
    VarVoyage.email = document.getElementById("mail").value;

    VarVoyage.datedep = document.getElementById("dep").value;
    VarVoyage.dateret = document.getElementById("ret").value;
    VarVoyage.ptdj = (document.getElementById("breakfast").checked ? 1 : 0);

    let D2 = new Date(VarVoyage.dateret).getTime();
    let D1 = new Date(VarVoyage.datedep).getTime();
    if (D2 < D1) {
        document.getElementById("BoutonEnvoi").disabled = false;
        alert("-!- Les dates choisies ne sont pas correctes -!-");
    } else {
        DureeVoy_ms = D2 - D1;
        DureeVoy_j = (DureeVoy_ms) / (1000 * 60 * 60 * 24);
    }


    let x = DureeVoy_j * (VarVoyage.dest.prix_j * (VarVoyage.nbradult + VarVoyage.nbrenfant / 2) + 12 * VarVoyage.ptdj * (VarVoyage.nbradult + VarVoyage.nbrenfant));
    document.getElementById("Prix_p_J").innerHTML = 'Prix du voyage : ' + Math.round(x * 100) / 100 + ' €';
}

function Setup() {
    topbut = document.getElementById("topbutton");
}

function fscroll() {
    if (document.documentElement.scrollTop > 120) {
        topbut.style.display = "block";
    } else {
        topbut.style.display = "none";
    }
}

function TopPage() {
    document.documentElement.scrollTop = 0;
}