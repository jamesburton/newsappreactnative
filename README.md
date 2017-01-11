# newsappreactnative
A test news application using react native.

# Packages
This project will use the following packages:
- react-native
- react-native-cli
- xmldom - https://www.npmjs.com/package/xmldom
- isomorphic-fetch - https://github.com/matthew-andrews/isomorphic-fetch
- rn-nodeify - https://www.npmjs.com/package/rn-nodeify

# Useful references
- Some handy details about ListView usage are available here: https://medium.com/differential/react-native-basics-how-to-use-the-listview-component-a0ec44cf1fe8#.1qayffj08
- Getting started with react-native is available here: https://facebook.github.io/react-native/docs/getting-started.html

# Notes
- NB: Python is required for feed-reader installation (on windows, use "choco upgrade -U python2")
- NB: Tried "rssparser", "feed-read", "feedparser" and "feed-reader" packages, but hit dependency issues within react-native
    - feed-read - https://www.npmjs.com/package/feed-read
    - rssparser - https://github.com/tk120404/node-rssparser
- NB: rn-nodeify is required to support libraries such as crypto within react-native
