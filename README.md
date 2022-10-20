## Scott-admin-react

### hooks

> **useRef**

useRef 返回一个可变 ref 对象，其 .current 属性初始化为传递的参数 (initialValue)。返回的对象将在组件的整个生命周期内持续存在。

本质上，useRef 就像一个“盒子”，可以在其 .current 属性中保存一个可变值。你可能熟悉 refs 主要是作为访问 DOM 的一种方式。如果您使用 `<div ref={myRef} />` 将 ref 对象传递给 React，那么只要该节点发生更改，React 就会将其 .current 属性设置为相应的 DOM 节点。

但是，useRef() 不仅仅对 ref 属性有用。它可以方便地保留任何可变值，类似于您在类中使用实例字段的方式。这是因为 useRef() 创建了一个普通的 JavaScript 对象。 useRef() 和自己创建 {current: ...} 对象之间的唯一区别是 useRef 将在每次渲染时为您提供相同的 ref 对象。

请记住，当其内容发生变化时，useRef 不会通知您。改变 .current 属性不会导致重新渲染。如果你想在 React 将 ref 附加或分离到 DOM 节点时运行一些代码，你可能需要使用 callback ref 来代替。

**简单来说，useRef 的作用就是用来帮助我们获取 DOM 节点，useRef 返回的是一个对象，对象中的 current 属性则是我们需要获取的 ODM 节点。**

> useEffect(副作用)

useEffect 接受包含命令式的、可能有效的代码的函数。

```javascript
useEffect(() => {
  // doSomething...
}, []);
```

函数组件的主体（称为 React 的渲染阶段）中不允许突变、订阅、计时器、日志记录和其他副作用。这样做会导致 UI 中出现令人困惑的错误和不一致。

相反，使用 useEffect。传递给 useEffect 的函数将在渲染提交到屏幕后运行。将效果视为从 React 的纯函数式世界到命令式世界的逃生口。默认情况下，效果会在每次完成渲染后运行，但您可以选择仅在某些值发生更改时触发它们。

**useEffect 可以实现类似于 vue 中的 watch 功能，第二个参数为数组，用于监听 state，同时如果不传递参数，useEffect 又可以实现类似生命周期的功能，在视图渲染完之后再执行**

- 清除 effect

通常，效果会创建在组件离开屏幕之前需要清理的资源，例如订阅或计时器 ID。为此，传递给 useEffect 的函数可能会返回一个清理函数。例如，要创建订阅：

```tsx
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});
```

清理功能在从 UI 中删除组件之前运行，以防止内存泄漏。此外，如果一个组件多次渲染（通常是这样），则在执行下一个效果之前会清理上一个效果
