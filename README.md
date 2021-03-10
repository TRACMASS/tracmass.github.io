# TRACMASS website

![TRACMASS header](/images/headers_footer/fig_socialimage.png)

This repository includes all the html files for the TRACMASS website, the source files are included.

## Develop Locally
This is a [Jekyll](https://jekyllrb.com) site using Git as a [CMS](https://en.wikipedia.org/wiki/Content_management_system). It was created using the libris theme from  [Stackbit](https://www.stackbit.com?utm_source=project-readme&utm_medium=referral&utm_campaign=user_themes).

1. Install a full [Ruby development environment](https://jekyllrb.com/docs/installation/)

1. Install Jekyll and Bundler:

        gem install jekyll bundler

1. Install dependencies from Gemfile:

        bundle install


1. Build the site and start the Jekyll local development server

        bundle exec jekyll serve --livereload

1. Open [http://localhost:4000](http://localhost:4000) in the browser


1. To extract the html files:

        wget -m -p -E -k http://localhost:4000

   Alternatively, one can use the runscript included in the src file.
