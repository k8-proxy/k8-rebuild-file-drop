*K8-REBUILD-FILE-DROP* is project bootstrapped with [Glasswall React App](https://github.com/filetrust/glasswall-react-app),
where Glasswall React App is a Glasswall template for [Create React App](https://github.com/facebook/create-react-app).

Following the links you can get familiar with the concepts.
In short setting up the *React App* is done by following just few commands:
    
    git clone https://github.com/facebook/create-react-app.git
    npx create-react-app app-name --template @glasswallsolutions/cra-template-glasswall-react-app   
    cd my-app
    npm start
Adding the `--template @glasswallsolutions/cra-template-glasswall-react-app` will lead you to the Glasswall login page. 

This concept is used as basis for setting up the File Drop, local interface for public [file-drop.co.uk](https://file-drop.co.uk/) website. 

## File Drop Setup via Command Line
- Run: `git clone https://github.com/k8-proxy/k8-rebuild-file-drop.git`
- On your local machine install `yarn` command
- Naviate to repo folder: `cd k8-rebuild-file-drop/app`
- Install node modules: `yarn install` (In case of the issue: https://github.com/date-fns/date-fns/issues/1004 run `yarn config set network-timeout 300000`)
- Run: `yarn build`
- Start the app: `yarn start`
- Open the `http://localhost:3000` in your Browser
- You will be able to see File Drop, React App web interface


## File Drop Setup via Dockerfile
- Run: `git clone https://github.com/k8-proxy/k8-rebuild-file-drop.git`
- Verify that Docker is up and running on your local machine
- Naviate to repo folder: `cd k8-rebuild-file-drop/app`
- Run: `docker build -t k8-rebuild-file-drop .`
- Run: `docker run -it --rm -p 80:80 k8-rebuild-file-drop`
- Open the `http://localhost` in your Browser
- You will be able to see File Drop, React App web interface

![image](https://user-images.githubusercontent.com/70108899/102829879-51df6280-43e8-11eb-8528-00d1a7ab7acb.png)

## Usage
TBD