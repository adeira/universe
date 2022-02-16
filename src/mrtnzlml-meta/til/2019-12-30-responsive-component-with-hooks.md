---
title: Responsive component with hooks
tags: ['react']
---

```js
function MyResponsiveComponent() {
  const width = useWindowWidth(); // Our custom Hook
  return <p>Window width is {width}</p>;
}
```

```js
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return width;
}
```

Source: https://gist.github.com/gaearon/cb5add26336003ed8c0004c4ba820eae
