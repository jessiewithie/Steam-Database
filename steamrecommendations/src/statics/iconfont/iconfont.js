import { createGlobalStyle } from 'styled-components';
createGlobalStyle`
@font-face {font-family: "iconfont";
src: url('./iconfont.eot?t=1572126623539'); /* IE9 */
src: url('./iconfont.eot?t=1572126623539#iefix') format('embedded-opentype'), /* IE6-IE8 */
url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAZ0AAsAAAAACzgAAAYmAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqJZIgIATYCJAMQCwoABCAFhG0HWBuKCVGUTlKG7E8Q5TDtwE8kpdO1x2wgwVEQBdfKvsUZeWB/gRtiVYNfAMDIBNdTD6xA8PR/3+7Mm/f/3rLRumInXUGiKAoowaLQSrhA8kD63zX9AwC1lxGVZNUAKb3+O24uMCA5J4GMBHKoWU6Ph/obve3vBBKlCWdF3ARZGGhSdGSHeHACO/Sd9jPJUUkqbDdHp8c0FReB23Mh+Oyv9/WcjMzwHnAh9IgIm44M/eV5Lq93CD7BZz0gXi+cXGkpkN3//5ivy+MDy2uzuWTkowUOcDyggUWkRYL+bwGCfxHPJvM5CbshINHWJmntG5mBTEaUCBQclkEh06NlCSQRKYKImTlOSuZF3b0LgIfx9/KHSOwA5RviXsetNw4dv6GlBNdwbrdbdWaAnQcOLAEG2SOtFymWeGlIk6j0VGtAJP1E8R3qav9F8YcijdAGWvifJz2iNAPiSuImjKcwoPheMeDww18AqaE0+uaDXAA6ArE5wQykTQV7YrPMnMoSxYEh9jTPClkU5ymwY79LUSrNbftvsf4J2/xA4CUbnKmnWmTcU3Jzk1hfxwDWeVX+9CO58dnZuOFSx9Onm5sXjSpamqcfTG5qlT01mNjQLF437loLWY1d3lghgQzygSnK200gqnQ5iWKyXWA37JoHNFtgK+bWHOi/ahKOSI/ZEjiTsAPHILCF0vtUGYUg+CSPb8uTQluKlIA4DQxxYCKAC2SQIPAsYYIJ0fpItuEiCRmuoBggIQFwyI9Dq9QLlWBuLb2y4jPwc/ndaGatUq1aUd/CxtHscrRSKTekqqeBaOySaKMOgkMEYgIhRupgOAqZu7F0IrOorouGZ+RkV++y7TY2yKdP5fALYvMDNg3j1p+7WRKZlbHlRzB+Zm2lfqHsgp4uZZKXUUPbnVXFIPGciRPk7jKtXbF2uzJr6Xwsu723UJkMd1dU0HiAifscbpO1OyeuJrh6VzZWPalEYOnlt2DwlsdKxuqWYwpMni4cNE82vnl2xNJqX7W3pf0jaAnNHz6ygBJLuzA0p3rWvvfZ6XB47NB/Uz2mVlaUrc0ctigyU9e01LCw0BB9f+2dH6m77w6Hc+SIort923CbOutZUisBi4uAj6qkLyp/K/tjqFiu/EC//PfBnODC//Ju0jeuRrlC+QO/o11JQ4gCoi3gHuG63VbxlyLnyIssyVRb0tckdfYJlitFeYfGpYYGx5ZHlrGussfOerGfsCRuRZIybSlVuynrDKMMAObspI9B7yRXul49SVB7ckvpyRMtY24n6e7TSB35WMQoQpLThoaHhthMoZQ15M7WZjNtnRSW0ebOMWjWz2Z2R1G10/vjmAZMkzjdLhYF/CNvw591vfuWATP90P2lb3kpahRYrQRl629vYjl0tp9r8mo03vPu/MNQkHQRRtd00Ic8nl+oX2GbQZ6NX5ttHifgoR/QXQ6i/U5IXNx6PfmPvlqtsD94/22SZiuT/K9wzTCktw8JIwgbSKQyCdCzvzjS16cdphWmB35oa3FihIGqgfZ2k/aomcu7BAe7abfxO4KU8zIHVCR9T70/tH+0dsWxk6GJ41l37jTQzh+hvuNmjugpWYmJ1YSr3bR9/LCTyFHHdtI+QDXAXi9O6/eRf+hP9NO/4fhBRucVnZjxtKIrAP5OGWTOP9TD/l+VT/Mc9OKTsQQF81+0+0QIvJ8/Q5hNxsXMy8y76svyU7CHE4g6yzdP4WSQhsv6NICwgkQywLWehIr3KpT1CyouInUHVKgFTmSINeISvNQKApENJBb656eqhBSSMTB3RECUnIIqeIFTcoM14ht4Db8QKAUVEqcYVkyN41H2IpAqjJPYLrE0ltBlg8o2C6fQ2HSpcAsM8hwKaQVIOBDyJ/oxgaKKMXLLiCilE10wj/SR/dB1GfEFs1FTAVMpPxoM6lF3CmjMg2wHAqIUFEfE7CIsGiZB1xor2YHfn4IMm1yUSKj5YZ6DBMlqnQgLCGXA9ksTmWp2BZW2GCIUhnWEzuYzHqIPzciVogzhR3ezIY0SYBYI+6KCWE/PKg00L/fWcBOQEM+0UHFi4vGnQuoVmmxT4rrABNuiakHQEolUaOa6xXUwBPVNS5MAAAA=') format('woff2'),
url('./iconfont.woff?t=1572126623539') format('woff'),
url('./iconfont.ttf?t=1572126623539') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
url('./iconfont.svg?t=1572126623539#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
font-family: "iconfont" !important;
font-size: 16px;
font-style: normal;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}

.icon-steam:before {
content: "\f23b";
}

.icon-house_renovation:before {
content: "\e74a";
}

.icon-search_infographics:before {
content: "\e7b4";
}
`;


