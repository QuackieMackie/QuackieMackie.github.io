const config = {
    pages: {
        home: 'index.html',
        blog: 'pages/blog.html',
        github: 'https://github.com/QuackieMackie',
    },
    basePath: window.location.pathname.includes('/pages/') ? '../../' : './',
};