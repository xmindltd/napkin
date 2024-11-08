interface DebounceOptions {
  leading?: boolean;
  maxWait?: number;
}

export function debounce<F extends (...args: any[]) => any>(
  func: F,
  delay = 0,
  options: DebounceOptions = {}
) {
  let timeout: number | undefined;
  let maxWait = options.maxWait;
  let lastCallTime: number | undefined;

  return function (this: any, ...args: Parameters<F>) {
    function run(this: any) {
      func.apply(this, args);
      timeout = undefined;
      lastCallTime = Date.now();
    }

    if (options.leading && !timeout) func.apply(this, args);
    clearTimeout(timeout);
    if (maxWait && lastCallTime && Date.now() - lastCallTime > maxWait) {
      run.call(this);
      return;
    }

    timeout = window.setTimeout(() => {
      run.call(this);
    }, delay);
  };
}
