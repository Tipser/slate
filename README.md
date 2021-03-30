# Tipser Elements docs

# Build

```npm run build```

# Testing before publishing

## Simple way (remote build)

1. Create a feature branch and push your changes there
2. Go to the related build on Netlify and preview the changes (shortcut: `netlify open`, if you have `netlify-cli` configured)
3. Whatever URL opens, don't forget to append `/docs` part to it 

## Advanced way (local build, if you really, desperately need it :) )

1. Make sure you have ruby installed on your computer
2. Install `bundler`: `gem install bundler`
3. In the project directory run: `bundle install`
4. Install `netlify-cli`, following the [instructions here](https://docs.netlify.com/cli/get-started/)
5. Run `netlify link` and link it to the default Netlify site
5. `npm run build`
6. `netlify dev`
