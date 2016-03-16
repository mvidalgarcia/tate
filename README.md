# tate
MongoDB, Node.js and Express app based on [Tate Gallery dataset](https://github.com/tategallery/collection).

## Install

Requeriments: Node.js, npm and MongoDB must be installed in your machine.

Download the dataset of artists and artworks and import it into a MongoDB database:

```bash
wget https://github.com/tategallery/collection/archive/master.zip
unzip master.zip

# First we load data from artist directory
cd collection-master/artists
find * -type f | while read col; do
  mongoimport -d tate -c artists --file $col --jsonArray;
done

# Then from the artworks directory
cd ../artworks
find * -type f | while read col; do
  mongoimport -d tate -c artworks --file $col --jsonArray;
done

```

Clone repository:

```bash
cd ~
git clone https://github.com/mvidalgarcia/tate.git
```

## Run

Open a terminal to let MongoDB daemon running:

```bash
cd tate
mongod --dbpath data/
```

In a different terminal install node depdendencies and run the app:

```bash
npm install
npm start
```

You should be able to access the web application from your usual browser with [http://localhost:3000](http://localhost:3000)
