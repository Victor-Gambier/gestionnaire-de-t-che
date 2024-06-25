import javafx.application.Application;
import javafx.concurrent.Worker;
import javafx.scene.Scene;
import javafx.scene.layout.VBox;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;

public class Main extends Application {

    @Override
    public void start(Stage primaryStage) {
        // Création de la WebView et du WebEngine
        WebView webView = new WebView();
        WebEngine webEngine = webView.getEngine();

        // Chargement du contenu HTML depuis les ressources
        webEngine.load(getClass().getResource("/index.html").toExternalForm());

        // Gestion de l'état de chargement de la page HTML
        webEngine.getLoadWorker().stateProperty().addListener((observable, oldValue, newValue) -> {
            if (newValue == Worker.State.FAILED) {
                System.err.println("Erreur lors du chargement de la page HTML.");
            }
        });

        // Création de la scène et configuration de la fenêtre principale
        VBox root = new VBox(webView);
        Scene scene = new Scene(root, 800, 600);

        primaryStage.setTitle("Gestionnaire de Tâches");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
