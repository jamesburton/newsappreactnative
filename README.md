# newsappreactnative
A test news application using react native.

# Packages
This project will use the following packages:
- react-native
- react-native-cli
- xmldom - https://www.npmjs.com/package/xmldom
- isomorphic-fetch - https://github.com/matthew-andrews/isomorphic-fetch
- rn-nodeify - https://www.npmjs.com/package/rn-nodeify
- native-base - http://nativebase.io/docs/v0.5.13/getting-started
- react-native-simple-toast - https://devhub.io/zh/repos/xgfe-react-native-simple-toast

# Useful references
- Some handy details about ListView usage are available here: https://medium.com/differential/react-native-basics-how-to-use-the-listview-component-a0ec44cf1fe8#.1qayffj08
- Getting started with react-native is available here: https://facebook.github.io/react-native/docs/getting-started.html

# Notes
- NB: Python is required for feed-reader installation (on windows, use "choco upgrade -U python2")
- NB: Tried "rssparser", "feed-read", "feedparser" and "feed-reader" packages, but hit dependency issues within react-native
    - feed-read - https://www.npmjs.com/package/feed-read
    - rssparser - https://github.com/tk120404/node-rssparser
- NB: rn-nodeify is required to support libraries such as crypto within react-native
- NB: [Older, see next step] There are linked assets with native-base and react-native-simple-toast, so you may need to install these with rnpm
    npm install -g rnpm
    rnpm link
- NB: rnpm functionality is now included in react-native, so install linked files using that instead:-
    react-native link
