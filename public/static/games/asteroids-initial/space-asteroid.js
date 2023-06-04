var Godot = (function () {
  var _scriptDir =
    typeof document !== 'undefined' && document.currentScript
      ? document.currentScript.src
      : undefined

  return function (Godot) {
    Godot = Godot || {}

    var Module = typeof Godot !== 'undefined' ? Godot : {}
    var moduleOverrides = {}
    var key
    for (key in Module) {
      if (Module.hasOwnProperty(key)) {
        moduleOverrides[key] = Module[key]
      }
    }
    var arguments_ = []
    var thisProgram = './this.program'
    var quit_ = function (status, toThrow) {
      throw toThrow
    }
    var ENVIRONMENT_IS_WEB = false
    var ENVIRONMENT_IS_WORKER = false
    var ENVIRONMENT_IS_NODE = false
    var ENVIRONMENT_IS_SHELL = false
    ENVIRONMENT_IS_WEB = typeof window === 'object'
    ENVIRONMENT_IS_WORKER = typeof importScripts === 'function'
    ENVIRONMENT_IS_NODE =
      typeof process === 'object' &&
      typeof process.versions === 'object' &&
      typeof process.versions.node === 'string'
    ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER
    var scriptDirectory = ''
    function locateFile(path) {
      if (Module['locateFile']) {
        return Module['locateFile'](path, scriptDirectory)
      }
      return scriptDirectory + path
    }
    var read_, readAsync, readBinary, setWindowTitle
    if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href
      } else if (document.currentScript) {
        scriptDirectory = document.currentScript.src
      }
      if (_scriptDir) {
        scriptDirectory = _scriptDir
      }
      if (scriptDirectory.indexOf('blob:') !== 0) {
        scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/') + 1)
      } else {
        scriptDirectory = ''
      }
      {
        read_ = function shell_read(url) {
          var xhr = new XMLHttpRequest()
          xhr.open('GET', url, false)
          xhr.send(null)
          return xhr.responseText
        }
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = function readBinary(url) {
            var xhr = new XMLHttpRequest()
            xhr.open('GET', url, false)
            xhr.responseType = 'arraybuffer'
            xhr.send(null)
            return new Uint8Array(xhr.response)
          }
        }
        readAsync = function readAsync(url, onload, onerror) {
          var xhr = new XMLHttpRequest()
          xhr.open('GET', url, true)
          xhr.responseType = 'arraybuffer'
          xhr.onload = function xhr_onload() {
            if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
              onload(xhr.response)
              return
            }
            onerror()
          }
          xhr.onerror = onerror
          xhr.send(null)
        }
      }
      setWindowTitle = function (title) {
        document.title = title
      }
    } else {
    }
    var out = Module['print'] || console.log.bind(console)
    var err = Module['printErr'] || console.warn.bind(console)
    for (key in moduleOverrides) {
      if (moduleOverrides.hasOwnProperty(key)) {
        Module[key] = moduleOverrides[key]
      }
    }
    moduleOverrides = null
    if (Module['arguments']) arguments_ = Module['arguments']
    if (Module['thisProgram']) thisProgram = Module['thisProgram']
    if (Module['quit']) quit_ = Module['quit']
    function dynamicAlloc(size) {
      var ret = HEAP32[DYNAMICTOP_PTR >> 2]
      var end = (ret + size + 15) & -16
      if (end > _emscripten_get_heap_size()) {
        abort()
      }
      HEAP32[DYNAMICTOP_PTR >> 2] = end
      return ret
    }
    function getNativeTypeSize(type) {
      switch (type) {
        case 'i1':
        case 'i8':
          return 1
        case 'i16':
          return 2
        case 'i32':
          return 4
        case 'i64':
          return 8
        case 'float':
          return 4
        case 'double':
          return 8
        default: {
          if (type[type.length - 1] === '*') {
            return 4
          } else if (type[0] === 'i') {
            var bits = Number(type.substr(1))
            assert(bits % 8 === 0, 'getNativeTypeSize invalid bits ' + bits + ', type ' + type)
            return bits / 8
          } else {
            return 0
          }
        }
      }
    }
    function warnOnce(text) {
      if (!warnOnce.shown) warnOnce.shown = {}
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1
        err(text)
      }
    }
    var tempRet0 = 0
    var setTempRet0 = function (value) {
      tempRet0 = value
    }
    var getTempRet0 = function () {
      return tempRet0
    }
    var wasmBinary
    if (Module['wasmBinary']) wasmBinary = Module['wasmBinary']
    var noExitRuntime
    if (Module['noExitRuntime']) noExitRuntime = Module['noExitRuntime']
    if (typeof WebAssembly !== 'object') {
      err('no native wasm support detected')
    }
    function setValue(ptr, value, type, noSafe) {
      type = type || 'i8'
      if (type.charAt(type.length - 1) === '*') type = 'i32'
      switch (type) {
        case 'i1':
          HEAP8[ptr >> 0] = value
          break
        case 'i8':
          HEAP8[ptr >> 0] = value
          break
        case 'i16':
          HEAP16[ptr >> 1] = value
          break
        case 'i32':
          HEAP32[ptr >> 2] = value
          break
        case 'i64':
          ;(tempI64 = [
            value >>> 0,
            ((tempDouble = value),
            +Math_abs(tempDouble) >= 1
              ? tempDouble > 0
                ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
                : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
              : 0)
          ]),
            (HEAP32[ptr >> 2] = tempI64[0]),
            (HEAP32[(ptr + 4) >> 2] = tempI64[1])
          break
        case 'float':
          HEAPF32[ptr >> 2] = value
          break
        case 'double':
          HEAPF64[ptr >> 3] = value
          break
        default:
          abort('invalid type for setValue: ' + type)
      }
    }
    function getValue(ptr, type, noSafe) {
      type = type || 'i8'
      if (type.charAt(type.length - 1) === '*') type = 'i32'
      switch (type) {
        case 'i1':
          return HEAP8[ptr >> 0]
        case 'i8':
          return HEAP8[ptr >> 0]
        case 'i16':
          return HEAP16[ptr >> 1]
        case 'i32':
          return HEAP32[ptr >> 2]
        case 'i64':
          return HEAP32[ptr >> 2]
        case 'float':
          return HEAPF32[ptr >> 2]
        case 'double':
          return HEAPF64[ptr >> 3]
        default:
          abort('invalid type for getValue: ' + type)
      }
      return null
    }
    var wasmMemory
    var wasmTable = new WebAssembly.Table({
      initial: 45381,
      maximum: 45381 + 0,
      element: 'anyfunc'
    })
    var ABORT = false
    var EXITSTATUS = 0
    function assert(condition, text) {
      if (!condition) {
        abort('Assertion failed: ' + text)
      }
    }
    function getCFunc(ident) {
      var func = Module['_' + ident]
      assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported')
      return func
    }
    function ccall(ident, returnType, argTypes, args, opts) {
      var toC = {
        string: function (str) {
          var ret = 0
          if (str !== null && str !== undefined && str !== 0) {
            var len = (str.length << 2) + 1
            ret = stackAlloc(len)
            stringToUTF8(str, ret, len)
          }
          return ret
        },
        array: function (arr) {
          var ret = stackAlloc(arr.length)
          writeArrayToMemory(arr, ret)
          return ret
        }
      }
      function convertReturnValue(ret) {
        if (returnType === 'string') return UTF8ToString(ret)
        if (returnType === 'boolean') return Boolean(ret)
        return ret
      }
      var func = getCFunc(ident)
      var cArgs = []
      var stack = 0
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]]
          if (converter) {
            if (stack === 0) stack = stackSave()
            cArgs[i] = converter(args[i])
          } else {
            cArgs[i] = args[i]
          }
        }
      }
      var ret = func.apply(null, cArgs)
      ret = convertReturnValue(ret)
      if (stack !== 0) stackRestore(stack)
      return ret
    }
    function cwrap(ident, returnType, argTypes, opts) {
      argTypes = argTypes || []
      var numericArgs = argTypes.every(function (type) {
        return type === 'number'
      })
      var numericRet = returnType !== 'string'
      if (numericRet && numericArgs && !opts) {
        return getCFunc(ident)
      }
      return function () {
        return ccall(ident, returnType, argTypes, arguments, opts)
      }
    }
    var ALLOC_NONE = 3
    function allocate(slab, types, allocator, ptr) {
      var zeroinit, size
      if (typeof slab === 'number') {
        zeroinit = true
        size = slab
      } else {
        zeroinit = false
        size = slab.length
      }
      var singleType = typeof types === 'string' ? types : null
      var ret
      if (allocator == ALLOC_NONE) {
        ret = ptr
      } else {
        ret = [_malloc, stackAlloc, dynamicAlloc][allocator](
          Math.max(size, singleType ? 1 : types.length)
        )
      }
      if (zeroinit) {
        var stop
        ptr = ret
        assert((ret & 3) == 0)
        stop = ret + (size & ~3)
        for (; ptr < stop; ptr += 4) {
          HEAP32[ptr >> 2] = 0
        }
        stop = ret + size
        while (ptr < stop) {
          HEAP8[ptr++ >> 0] = 0
        }
        return ret
      }
      if (singleType === 'i8') {
        if (slab.subarray || slab.slice) {
          HEAPU8.set(slab, ret)
        } else {
          HEAPU8.set(new Uint8Array(slab), ret)
        }
        return ret
      }
      var i = 0,
        type,
        typeSize,
        previousType
      while (i < size) {
        var curr = slab[i]
        type = singleType || types[i]
        if (type === 0) {
          i++
          continue
        }
        if (type == 'i64') type = 'i32'
        setValue(ret + i, curr, type)
        if (previousType !== type) {
          typeSize = getNativeTypeSize(type)
          previousType = type
        }
        i += typeSize
      }
      return ret
    }
    var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined
    function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
      var endIdx = idx + maxBytesToRead
      var endPtr = idx
      while (u8Array[endPtr] && !(endPtr >= endIdx)) ++endPtr
      if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
        return UTF8Decoder.decode(u8Array.subarray(idx, endPtr))
      } else {
        var str = ''
        while (idx < endPtr) {
          var u0 = u8Array[idx++]
          if (!(u0 & 128)) {
            str += String.fromCharCode(u0)
            continue
          }
          var u1 = u8Array[idx++] & 63
          if ((u0 & 224) == 192) {
            str += String.fromCharCode(((u0 & 31) << 6) | u1)
            continue
          }
          var u2 = u8Array[idx++] & 63
          if ((u0 & 240) == 224) {
            u0 = ((u0 & 15) << 12) | (u1 << 6) | u2
          } else {
            u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (u8Array[idx++] & 63)
          }
          if (u0 < 65536) {
            str += String.fromCharCode(u0)
          } else {
            var ch = u0 - 65536
            str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023))
          }
        }
      }
      return str
    }
    function UTF8ToString(ptr, maxBytesToRead) {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ''
    }
    function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
      if (!(maxBytesToWrite > 0)) return 0
      var startIdx = outIdx
      var endIdx = outIdx + maxBytesToWrite - 1
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i)
        if (u >= 55296 && u <= 57343) {
          var u1 = str.charCodeAt(++i)
          u = (65536 + ((u & 1023) << 10)) | (u1 & 1023)
        }
        if (u <= 127) {
          if (outIdx >= endIdx) break
          outU8Array[outIdx++] = u
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx) break
          outU8Array[outIdx++] = 192 | (u >> 6)
          outU8Array[outIdx++] = 128 | (u & 63)
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx) break
          outU8Array[outIdx++] = 224 | (u >> 12)
          outU8Array[outIdx++] = 128 | ((u >> 6) & 63)
          outU8Array[outIdx++] = 128 | (u & 63)
        } else {
          if (outIdx + 3 >= endIdx) break
          outU8Array[outIdx++] = 240 | (u >> 18)
          outU8Array[outIdx++] = 128 | ((u >> 12) & 63)
          outU8Array[outIdx++] = 128 | ((u >> 6) & 63)
          outU8Array[outIdx++] = 128 | (u & 63)
        }
      }
      outU8Array[outIdx] = 0
      return outIdx - startIdx
    }
    function stringToUTF8(str, outPtr, maxBytesToWrite) {
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
    }
    function lengthBytesUTF8(str) {
      var len = 0
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i)
        if (u >= 55296 && u <= 57343)
          u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023)
        if (u <= 127) ++len
        else if (u <= 2047) len += 2
        else if (u <= 65535) len += 3
        else len += 4
      }
      return len
    }
    var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined
    function stringToUTF16(str, outPtr, maxBytesToWrite) {
      if (maxBytesToWrite === undefined) {
        maxBytesToWrite = 2147483647
      }
      if (maxBytesToWrite < 2) return 0
      maxBytesToWrite -= 2
      var startPtr = outPtr
      var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length
      for (var i = 0; i < numCharsToWrite; ++i) {
        var codeUnit = str.charCodeAt(i)
        HEAP16[outPtr >> 1] = codeUnit
        outPtr += 2
      }
      HEAP16[outPtr >> 1] = 0
      return outPtr - startPtr
    }
    function allocateUTF8(str) {
      var size = lengthBytesUTF8(str) + 1
      var ret = _malloc(size)
      if (ret) stringToUTF8Array(str, HEAP8, ret, size)
      return ret
    }
    function allocateUTF8OnStack(str) {
      var size = lengthBytesUTF8(str) + 1
      var ret = stackAlloc(size)
      stringToUTF8Array(str, HEAP8, ret, size)
      return ret
    }
    function writeArrayToMemory(array, buffer) {
      HEAP8.set(array, buffer)
    }
    function writeAsciiToMemory(str, buffer, dontAddNull) {
      for (var i = 0; i < str.length; ++i) {
        HEAP8[buffer++ >> 0] = str.charCodeAt(i)
      }
      if (!dontAddNull) HEAP8[buffer >> 0] = 0
    }
    var WASM_PAGE_SIZE = 65536
    function alignUp(x, multiple) {
      if (x % multiple > 0) {
        x += multiple - (x % multiple)
      }
      return x
    }
    var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64
    function updateGlobalBufferAndViews(buf) {
      buffer = buf
      Module['HEAP8'] = HEAP8 = new Int8Array(buf)
      Module['HEAP16'] = HEAP16 = new Int16Array(buf)
      Module['HEAP32'] = HEAP32 = new Int32Array(buf)
      Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf)
      Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf)
      Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf)
      Module['HEAPF32'] = HEAPF32 = new Float32Array(buf)
      Module['HEAPF64'] = HEAPF64 = new Float64Array(buf)
    }
    var STACK_MAX = 3502528,
      DYNAMIC_BASE = 8745408,
      DYNAMICTOP_PTR = 3502368
    var TOTAL_STACK = 5242880
    var INITIAL_INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 33554432
    if (Module['wasmMemory']) {
      wasmMemory = Module['wasmMemory']
    } else {
      wasmMemory = new WebAssembly.Memory({ initial: INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE })
    }
    if (wasmMemory) {
      buffer = wasmMemory.buffer
    }
    INITIAL_INITIAL_MEMORY = buffer.byteLength
    updateGlobalBufferAndViews(buffer)
    HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE
    function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        var callback = callbacks.shift()
        if (typeof callback == 'function') {
          callback()
          continue
        }
        var func = callback.func
        if (typeof func === 'number') {
          if (callback.arg === undefined) {
            Module['dynCall_v'](func)
          } else {
            Module['dynCall_vi'](func, callback.arg)
          }
        } else {
          func(callback.arg === undefined ? null : callback.arg)
        }
      }
    }
    var __ATPRERUN__ = []
    var __ATINIT__ = []
    var __ATMAIN__ = []
    var __ATEXIT__ = []
    var __ATPOSTRUN__ = []
    var runtimeInitialized = false
    var runtimeExited = false
    function preRun() {
      if (Module['preRun']) {
        if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']]
        while (Module['preRun'].length) {
          addOnPreRun(Module['preRun'].shift())
        }
      }
      callRuntimeCallbacks(__ATPRERUN__)
    }
    function initRuntime() {
      runtimeInitialized = true
      if (!Module['noFSInit'] && !FS.init.initialized) FS.init()
      TTY.init()
      SOCKFS.root = FS.mount(SOCKFS, {}, null)
      PIPEFS.root = FS.mount(PIPEFS, {}, null)
      callRuntimeCallbacks(__ATINIT__)
    }
    function preMain() {
      FS.ignorePermissions = false
      callRuntimeCallbacks(__ATMAIN__)
    }
    function exitRuntime() {
      callRuntimeCallbacks(__ATEXIT__)
      FS.quit()
      TTY.shutdown()
      runtimeExited = true
    }
    function postRun() {
      if (Module['postRun']) {
        if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']]
        while (Module['postRun'].length) {
          addOnPostRun(Module['postRun'].shift())
        }
      }
      callRuntimeCallbacks(__ATPOSTRUN__)
    }
    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb)
    }
    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb)
    }
    var Math_abs = Math.abs
    var Math_ceil = Math.ceil
    var Math_floor = Math.floor
    var Math_min = Math.min
    var runDependencies = 0
    var runDependencyWatcher = null
    var dependenciesFulfilled = null
    function getUniqueRunDependency(id) {
      return id
    }
    function addRunDependency(id) {
      runDependencies++
      if (Module['monitorRunDependencies']) {
        Module['monitorRunDependencies'](runDependencies)
      }
    }
    function removeRunDependency(id) {
      runDependencies--
      if (Module['monitorRunDependencies']) {
        Module['monitorRunDependencies'](runDependencies)
      }
      if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
          clearInterval(runDependencyWatcher)
          runDependencyWatcher = null
        }
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled
          dependenciesFulfilled = null
          callback()
        }
      }
    }
    Module['preloadedImages'] = {}
    Module['preloadedAudios'] = {}
    function abort(what) {
      if (Module['onAbort']) {
        Module['onAbort'](what)
      }
      what += ''
      out(what)
      err(what)
      ABORT = true
      EXITSTATUS = 1
      what = 'abort(' + what + '). Build with -s ASSERTIONS=1 for more info.'
      throw new WebAssembly.RuntimeError(what)
    }
    var dataURIPrefix = 'data:application/octet-stream;base64,'
    function isDataURI(filename) {
      return String.prototype.startsWith
        ? filename.startsWith(dataURIPrefix)
        : filename.indexOf(dataURIPrefix) === 0
    }
    var wasmBinaryFile = 'godot.javascript.opt.mono.wasm'
    if (!isDataURI(wasmBinaryFile)) {
      wasmBinaryFile = locateFile(wasmBinaryFile)
    }
    function getBinary() {
      try {
        if (wasmBinary) {
          return new Uint8Array(wasmBinary)
        }
        if (readBinary) {
          return readBinary(wasmBinaryFile)
        } else {
          throw 'both async and sync fetching of the wasm failed'
        }
      } catch (err) {
        abort(err)
      }
    }
    function getBinaryPromise() {
      if (
        !wasmBinary &&
        (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) &&
        typeof fetch === 'function'
      ) {
        return fetch(wasmBinaryFile, { credentials: 'same-origin' })
          .then(function (response) {
            if (!response['ok']) {
              throw "failed to load wasm binary file at '" + wasmBinaryFile + "'"
            }
            return response['arrayBuffer']()
          })
          .catch(function () {
            return getBinary()
          })
      }
      return new Promise(function (resolve, reject) {
        resolve(getBinary())
      })
    }
    function createWasm() {
      var info = { a: asmLibraryArg }
      function receiveInstance(instance, module) {
        var exports = instance.exports
        Module['asm'] = exports
        removeRunDependency('wasm-instantiate')
      }
      addRunDependency('wasm-instantiate')
      function receiveInstantiatedSource(output) {
        receiveInstance(output['instance'])
      }
      function instantiateArrayBuffer(receiver) {
        return getBinaryPromise()
          .then(function (binary) {
            return WebAssembly.instantiate(binary, info)
          })
          .then(receiver, function (reason) {
            err('failed to asynchronously prepare wasm: ' + reason)
            abort(reason)
          })
      }
      function instantiateAsync() {
        if (
          !wasmBinary &&
          typeof WebAssembly.instantiateStreaming === 'function' &&
          !isDataURI(wasmBinaryFile) &&
          typeof fetch === 'function'
        ) {
          fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function (response) {
            var result = WebAssembly.instantiateStreaming(response, info)
            return result.then(receiveInstantiatedSource, function (reason) {
              err('wasm streaming compile failed: ' + reason)
              err('falling back to ArrayBuffer instantiation')
              instantiateArrayBuffer(receiveInstantiatedSource)
            })
          })
        } else {
          return instantiateArrayBuffer(receiveInstantiatedSource)
        }
      }
      if (Module['instantiateWasm']) {
        try {
          var exports = Module['instantiateWasm'](info, receiveInstance)
          return exports
        } catch (e) {
          err('Module.instantiateWasm callback failed with error: ' + e)
          return false
        }
      }
      instantiateAsync()
      return {}
    }
    var tempDouble
    var tempI64
    var ASM_CONSTS = {
      561784: function () {
        return STACK_MAX
      },
      561806: function () {
        return TOTAL_STACK
      },
      964064: function ($0, $1) {
        var str = UTF8ToString($0)
        try {
          var res = eval(str)
          if (res === null || res == undefined) return 0
          res = res.toString()
          setValue($1, 0, 'i32')
        } catch (e) {
          res = e.toString()
          setValue($1, 1, 'i32')
          if (res === null || res === undefined) res = 'unknown exception'
        }
        var buff = Module._malloc((res.length + 1) * 2)
        stringToUTF16(res, buff, (res.length + 1) * 2)
        return buff
      },
      965109: function () {
        var err = new Error()
        console.log('Stacktrace: \n')
        console.log(err.stack)
      }
    }
    function _emscripten_asm_const_iii(code, sigPtr, argbuf) {
      var args = readAsmConstArgs(sigPtr, argbuf)
      return ASM_CONSTS[code].apply(null, args)
    }
    function compile_funtion(snippet, is_exception) {
      try {
        var data = UTF8ToString(snippet)
        var wrapper = '(function () { ' + data + ' })'
        var funcFactory = eval(wrapper)
        var func = funcFactory()
        if (typeof func !== 'function') {
          throw new Error(
            'Code must return an instance of a JavaScript function. ' +
              'Please use `return` statement to return a function.'
          )
        }
        setValue(is_exception, 0, 'i32')
        return BINDING.js_to_mono_obj(func)
      } catch (e) {
        res = e.toString()
        setValue(is_exception, 1, 'i32')
        if (res === null || res === undefined) res = 'unknown exception'
        return BINDING.js_to_mono_obj(res)
      }
    }
    __ATINIT__.push({
      func: function () {
        ___wasm_call_ctors()
      }
    })
    function demangle(func) {
      return func
    }
    function demangleAll(text) {
      var regex = /\b_Z[\w\d_]+/g
      return text.replace(regex, function (x) {
        var y = demangle(x)
        return x === y ? x : y + ' [' + x + ']'
      })
    }
    function jsStackTrace() {
      var err = new Error()
      if (!err.stack) {
        try {
          throw new Error()
        } catch (e) {
          err = e
        }
        if (!err.stack) {
          return '(no stack trace available)'
        }
      }
      return err.stack.toString()
    }
    function stackTrace() {
      var js = jsStackTrace()
      if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']()
      return demangleAll(js)
    }
    function ___assert_fail(condition, filename, line, func) {
      abort(
        'Assertion failed: ' +
          UTF8ToString(condition) +
          ', at: ' +
          [
            filename ? UTF8ToString(filename) : 'unknown filename',
            line,
            func ? UTF8ToString(func) : 'unknown function'
          ]
      )
    }
    var _emscripten_get_now
    _emscripten_get_now = function () {
      return performance.now()
    }
    var _emscripten_get_now_is_monotonic = true
    function ___setErrNo(value) {
      if (Module['___errno_location']) HEAP32[Module['___errno_location']() >> 2] = value
      return value
    }
    function _clock_gettime(clk_id, tp) {
      var now
      if (clk_id === 0) {
        now = Date.now()
      } else if ((clk_id === 1 || clk_id === 4) && _emscripten_get_now_is_monotonic) {
        now = _emscripten_get_now()
      } else {
        ___setErrNo(28)
        return -1
      }
      HEAP32[tp >> 2] = (now / 1e3) | 0
      HEAP32[(tp + 4) >> 2] = ((now % 1e3) * 1e3 * 1e3) | 0
      return 0
    }
    function ___clock_gettime(a0, a1) {
      return _clock_gettime(a0, a1)
    }
    function ___cxa_allocate_exception(size) {
      return _malloc(size)
    }
    function _atexit(func, arg) {
      __ATEXIT__.unshift({ func: func, arg: arg })
    }
    function ___cxa_atexit(a0, a1) {
      return _atexit(a0, a1)
    }
    var ___exception_infos = {}
    var ___exception_caught = []
    function ___exception_addRef(ptr) {
      if (!ptr) return
      var info = ___exception_infos[ptr]
      info.refcount++
    }
    function ___exception_deAdjust(adjusted) {
      if (!adjusted || ___exception_infos[adjusted]) return adjusted
      for (var key in ___exception_infos) {
        var ptr = +key
        var adj = ___exception_infos[ptr].adjusted
        var len = adj.length
        for (var i = 0; i < len; i++) {
          if (adj[i] === adjusted) {
            return ptr
          }
        }
      }
      return adjusted
    }
    function ___cxa_begin_catch(ptr) {
      var info = ___exception_infos[ptr]
      if (info && !info.caught) {
        info.caught = true
        __ZSt18uncaught_exceptionv.uncaught_exceptions--
      }
      if (info) info.rethrown = false
      ___exception_caught.push(ptr)
      ___exception_addRef(___exception_deAdjust(ptr))
      return ptr
    }
    var ___exception_last = 0
    function ___cxa_free_exception(ptr) {
      try {
        return _free(ptr)
      } catch (e) {}
    }
    function ___exception_decRef(ptr) {
      if (!ptr) return
      var info = ___exception_infos[ptr]
      info.refcount--
      if (info.refcount === 0 && !info.rethrown) {
        if (info.destructor) {
          Module['dynCall_ii'](info.destructor, ptr)
        }
        delete ___exception_infos[ptr]
        ___cxa_free_exception(ptr)
      }
    }
    function ___cxa_end_catch() {
      _setThrew(0)
      var ptr = ___exception_caught.pop()
      if (ptr) {
        ___exception_decRef(___exception_deAdjust(ptr))
        ___exception_last = 0
      }
    }
    function ___cxa_find_matching_catch_3() {
      var thrown = ___exception_last
      if (!thrown) {
        return (setTempRet0(0), 0) | 0
      }
      var info = ___exception_infos[thrown]
      var throwntype = info.type
      if (!throwntype) {
        return (setTempRet0(0), thrown) | 0
      }
      var typeArray = Array.prototype.slice.call(arguments)
      var pointer = ___cxa_is_pointer_type(throwntype)
      var buffer = 0
      HEAP32[buffer >> 2] = thrown
      thrown = buffer
      for (var i = 0; i < typeArray.length; i++) {
        if (typeArray[i] && ___cxa_can_catch(typeArray[i], throwntype, thrown)) {
          thrown = HEAP32[thrown >> 2]
          info.adjusted.push(thrown)
          return (setTempRet0(typeArray[i]), thrown) | 0
        }
      }
      thrown = HEAP32[thrown >> 2]
      return (setTempRet0(throwntype), thrown) | 0
    }
    function ___cxa_throw(ptr, type, destructor) {
      ___exception_infos[ptr] = {
        ptr: ptr,
        adjusted: [ptr],
        type: type,
        destructor: destructor,
        refcount: 0,
        caught: false,
        rethrown: false
      }
      ___exception_last = ptr
      if (!('uncaught_exception' in __ZSt18uncaught_exceptionv)) {
        __ZSt18uncaught_exceptionv.uncaught_exceptions = 1
      } else {
        __ZSt18uncaught_exceptionv.uncaught_exceptions++
      }
      throw ptr
    }
    function ___map_file(pathname, size) {
      ___setErrNo(63)
      return -1
    }
    function ___resumeException(ptr) {
      if (!___exception_last) {
        ___exception_last = ptr
      }
      throw ptr
    }
    var PATH = {
      splitPath: function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
        return splitPathRe.exec(filename).slice(1)
      },
      normalizeArray: function (parts, allowAboveRoot) {
        var up = 0
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i]
          if (last === '.') {
            parts.splice(i, 1)
          } else if (last === '..') {
            parts.splice(i, 1)
            up++
          } else if (up) {
            parts.splice(i, 1)
            up--
          }
        }
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..')
          }
        }
        return parts
      },
      normalize: function (path) {
        var isAbsolute = path.charAt(0) === '/',
          trailingSlash = path.substr(-1) === '/'
        path = PATH.normalizeArray(
          path.split('/').filter(function (p) {
            return !!p
          }),
          !isAbsolute
        ).join('/')
        if (!path && !isAbsolute) {
          path = '.'
        }
        if (path && trailingSlash) {
          path += '/'
        }
        return (isAbsolute ? '/' : '') + path
      },
      dirname: function (path) {
        var result = PATH.splitPath(path),
          root = result[0],
          dir = result[1]
        if (!root && !dir) {
          return '.'
        }
        if (dir) {
          dir = dir.substr(0, dir.length - 1)
        }
        return root + dir
      },
      basename: function (path) {
        if (path === '/') return '/'
        var lastSlash = path.lastIndexOf('/')
        if (lastSlash === -1) return path
        return path.substr(lastSlash + 1)
      },
      extname: function (path) {
        return PATH.splitPath(path)[3]
      },
      join: function () {
        var paths = Array.prototype.slice.call(arguments, 0)
        return PATH.normalize(paths.join('/'))
      },
      join2: function (l, r) {
        return PATH.normalize(l + '/' + r)
      }
    }
    var PATH_FS = {
      resolve: function () {
        var resolvedPath = '',
          resolvedAbsolute = false
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? arguments[i] : FS.cwd()
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings')
          } else if (!path) {
            return ''
          }
          resolvedPath = path + '/' + resolvedPath
          resolvedAbsolute = path.charAt(0) === '/'
        }
        resolvedPath = PATH.normalizeArray(
          resolvedPath.split('/').filter(function (p) {
            return !!p
          }),
          !resolvedAbsolute
        ).join('/')
        return (resolvedAbsolute ? '/' : '') + resolvedPath || '.'
      },
      relative: function (from, to) {
        from = PATH_FS.resolve(from).substr(1)
        to = PATH_FS.resolve(to).substr(1)
        function trim(arr) {
          var start = 0
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break
          }
          var end = arr.length - 1
          for (; end >= 0; end--) {
            if (arr[end] !== '') break
          }
          if (start > end) return []
          return arr.slice(start, end - start + 1)
        }
        var fromParts = trim(from.split('/'))
        var toParts = trim(to.split('/'))
        var length = Math.min(fromParts.length, toParts.length)
        var samePartsLength = length
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i
            break
          }
        }
        var outputParts = []
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..')
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength))
        return outputParts.join('/')
      }
    }
    var TTY = {
      ttys: [],
      init: function () {},
      shutdown: function () {},
      register: function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops }
        FS.registerDevice(dev, TTY.stream_ops)
      },
      stream_ops: {
        open: function (stream) {
          var tty = TTY.ttys[stream.node.rdev]
          if (!tty) {
            throw new FS.ErrnoError(43)
          }
          stream.tty = tty
          stream.seekable = false
        },
        close: function (stream) {
          stream.tty.ops.flush(stream.tty)
        },
        flush: function (stream) {
          stream.tty.ops.flush(stream.tty)
        },
        read: function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60)
          }
          var bytesRead = 0
          for (var i = 0; i < length; i++) {
            var result
            try {
              result = stream.tty.ops.get_char(stream.tty)
            } catch (e) {
              throw new FS.ErrnoError(29)
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6)
            }
            if (result === null || result === undefined) break
            bytesRead++
            buffer[offset + i] = result
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now()
          }
          return bytesRead
        },
        write: function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60)
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset + i])
            }
          } catch (e) {
            throw new FS.ErrnoError(29)
          }
          if (length) {
            stream.node.timestamp = Date.now()
          }
          return i
        }
      },
      default_tty_ops: {
        get_char: function (tty) {
          if (!tty.input.length) {
            var result = null
            if (typeof window != 'undefined' && typeof window.prompt == 'function') {
              result = window.prompt('Input: ')
              if (result !== null) {
                result += '\n'
              }
            } else if (typeof readline == 'function') {
              result = readline()
              if (result !== null) {
                result += '\n'
              }
            }
            if (!result) {
              return null
            }
            tty.input = intArrayFromString(result, true)
          }
          return tty.input.shift()
        },
        put_char: function (tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0))
            tty.output = []
          } else {
            if (val != 0) tty.output.push(val)
          }
        },
        flush: function (tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0))
            tty.output = []
          }
        }
      },
      default_tty1_ops: {
        put_char: function (tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0))
            tty.output = []
          } else {
            if (val != 0) tty.output.push(val)
          }
        },
        flush: function (tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0))
            tty.output = []
          }
        }
      }
    }
    var MEMFS = {
      ops_table: null,
      mount: function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 511, 0)
      },
      createNode: function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          throw new FS.ErrnoError(63)
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: { llseek: MEMFS.stream_ops.llseek }
            },
            file: {
              node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr },
              stream: FS.chrdev_stream_ops
            }
          }
        }
        var node = FS.createNode(parent, name, mode, dev)
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node
          node.stream_ops = MEMFS.ops_table.dir.stream
          node.contents = {}
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node
          node.stream_ops = MEMFS.ops_table.file.stream
          node.usedBytes = 0
          node.contents = null
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node
          node.stream_ops = MEMFS.ops_table.link.stream
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node
          node.stream_ops = MEMFS.ops_table.chrdev.stream
        }
        node.timestamp = Date.now()
        if (parent) {
          parent.contents[name] = node
        }
        return node
      },
      getFileDataAsRegularArray: function (node) {
        if (node.contents && node.contents.subarray) {
          var arr = []
          for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i])
          return arr
        }
        return node.contents
      },
      getFileDataAsTypedArray: function (node) {
        if (!node.contents) return new Uint8Array(0)
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes)
        return new Uint8Array(node.contents)
      },
      expandFileStorage: function (node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0
        if (prevCapacity >= newCapacity) return
        var CAPACITY_DOUBLING_MAX = 1024 * 1024
        newCapacity = Math.max(
          newCapacity,
          (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) | 0
        )
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256)
        var oldContents = node.contents
        node.contents = new Uint8Array(newCapacity)
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0)
        return
      },
      resizeFileStorage: function (node, newSize) {
        if (node.usedBytes == newSize) return
        if (newSize == 0) {
          node.contents = null
          node.usedBytes = 0
          return
        }
        if (!node.contents || node.contents.subarray) {
          var oldContents = node.contents
          node.contents = new Uint8Array(newSize)
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)))
          }
          node.usedBytes = newSize
          return
        }
        if (!node.contents) node.contents = []
        if (node.contents.length > newSize) node.contents.length = newSize
        else while (node.contents.length < newSize) node.contents.push(0)
        node.usedBytes = newSize
      },
      node_ops: {
        getattr: function (node) {
          var attr = {}
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1
          attr.ino = node.id
          attr.mode = node.mode
          attr.nlink = 1
          attr.uid = 0
          attr.gid = 0
          attr.rdev = node.rdev
          if (FS.isDir(node.mode)) {
            attr.size = 4096
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length
          } else {
            attr.size = 0
          }
          attr.atime = new Date(node.timestamp)
          attr.mtime = new Date(node.timestamp)
          attr.ctime = new Date(node.timestamp)
          attr.blksize = 4096
          attr.blocks = Math.ceil(attr.size / attr.blksize)
          return attr
        },
        setattr: function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size)
          }
        },
        lookup: function (parent, name) {
          throw FS.genericErrors[44]
        },
        mknod: function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev)
        },
        rename: function (old_node, new_dir, new_name) {
          if (FS.isDir(old_node.mode)) {
            var new_node
            try {
              new_node = FS.lookupNode(new_dir, new_name)
            } catch (e) {}
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55)
              }
            }
          }
          delete old_node.parent.contents[old_node.name]
          old_node.name = new_name
          new_dir.contents[new_name] = old_node
          old_node.parent = new_dir
        },
        unlink: function (parent, name) {
          delete parent.contents[name]
        },
        rmdir: function (parent, name) {
          var node = FS.lookupNode(parent, name)
          for (var i in node.contents) {
            throw new FS.ErrnoError(55)
          }
          delete parent.contents[name]
        },
        readdir: function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue
            }
            entries.push(key)
          }
          return entries
        },
        symlink: function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 | 40960, 0)
          node.link = oldpath
          return node
        },
        readlink: function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28)
          }
          return node.link
        }
      },
      stream_ops: {
        read: function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents
          if (position >= stream.node.usedBytes) return 0
          var size = Math.min(stream.node.usedBytes - position, length)
          if (size > 8 && contents.subarray) {
            buffer.set(contents.subarray(position, position + size), offset)
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i]
          }
          return size
        },
        write: function (stream, buffer, offset, length, position, canOwn) {
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false
          }
          if (!length) return 0
          var node = stream.node
          node.timestamp = Date.now()
          if (buffer.subarray && (!node.contents || node.contents.subarray)) {
            if (canOwn) {
              node.contents = buffer.subarray(offset, offset + length)
              node.usedBytes = length
              return length
            } else if (node.usedBytes === 0 && position === 0) {
              node.contents = buffer.slice(offset, offset + length)
              node.usedBytes = length
              return length
            } else if (position + length <= node.usedBytes) {
              node.contents.set(buffer.subarray(offset, offset + length), position)
              return length
            }
          }
          MEMFS.expandFileStorage(node, position + length)
          if (node.contents.subarray && buffer.subarray)
            node.contents.set(buffer.subarray(offset, offset + length), position)
          else {
            for (var i = 0; i < length; i++) {
              node.contents[position + i] = buffer[offset + i]
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length)
          return length
        },
        llseek: function (stream, offset, whence) {
          var position = offset
          if (whence === 1) {
            position += stream.position
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28)
          }
          return position
        },
        allocate: function (stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length)
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length)
        },
        mmap: function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43)
          }
          var ptr
          var allocated
          var contents = stream.node.contents
          if (!(flags & 2) && contents.buffer === buffer.buffer) {
            allocated = false
            ptr = contents.byteOffset
          } else {
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length)
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length)
              }
            }
            allocated = true
            var fromHeap = buffer.buffer == HEAP8.buffer
            ptr = _malloc(length)
            if (!ptr) {
              throw new FS.ErrnoError(48)
            }
            ;(fromHeap ? HEAP8 : buffer).set(contents, ptr)
          }
          return { ptr: ptr, allocated: allocated }
        },
        msync: function (stream, buffer, offset, length, mmapFlags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43)
          }
          if (mmapFlags & 2) {
            return 0
          }
          var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false)
          return 0
        }
      }
    }
    var IDBFS = {
      dbs: {},
      indexedDB: function () {
        if (typeof indexedDB !== 'undefined') return indexedDB
        var ret = null
        if (typeof window === 'object')
          ret =
            window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
        assert(ret, 'IDBFS used, but indexedDB not supported')
        return ret
      },
      DB_VERSION: 21,
      DB_STORE_NAME: 'FILE_DATA',
      mount: function (mount) {
        return MEMFS.mount.apply(null, arguments)
      },
      syncfs: function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function (err, local) {
          if (err) return callback(err)
          IDBFS.getRemoteSet(mount, function (err, remote) {
            if (err) return callback(err)
            var src = populate ? remote : local
            var dst = populate ? local : remote
            IDBFS.reconcile(src, dst, callback)
          })
        })
      },
      getDB: function (name, callback) {
        var db = IDBFS.dbs[name]
        if (db) {
          return callback(null, db)
        }
        var req
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION)
        } catch (e) {
          return callback(e)
        }
        if (!req) {
          return callback('Unable to connect to IndexedDB')
        }
        req.onupgradeneeded = function (e) {
          var db = e.target.result
          var transaction = e.target.transaction
          var fileStore
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME)
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME)
          }
          if (!fileStore.indexNames.contains('timestamp')) {
            fileStore.createIndex('timestamp', 'timestamp', { unique: false })
          }
        }
        req.onsuccess = function () {
          db = req.result
          IDBFS.dbs[name] = db
          callback(null, db)
        }
        req.onerror = function (e) {
          callback(this.error)
          e.preventDefault()
        }
      },
      getLocalSet: function (mount, callback) {
        var entries = {}
        function isRealDir(p) {
          return p !== '.' && p !== '..'
        }
        function toAbsolute(root) {
          return function (p) {
            return PATH.join2(root, p)
          }
        }
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint))
        while (check.length) {
          var path = check.pop()
          var stat
          try {
            stat = FS.stat(path)
          } catch (e) {
            return callback(e)
          }
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)))
          }
          entries[path] = { timestamp: stat.mtime }
        }
        return callback(null, { type: 'local', entries: entries })
      },
      getRemoteSet: function (mount, callback) {
        var entries = {}
        IDBFS.getDB(mount.mountpoint, function (err, db) {
          if (err) return callback(err)
          try {
            var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly')
            transaction.onerror = function (e) {
              callback(this.error)
              e.preventDefault()
            }
            var store = transaction.objectStore(IDBFS.DB_STORE_NAME)
            var index = store.index('timestamp')
            index.openKeyCursor().onsuccess = function (event) {
              var cursor = event.target.result
              if (!cursor) {
                return callback(null, { type: 'remote', db: db, entries: entries })
              }
              entries[cursor.primaryKey] = { timestamp: cursor.key }
              cursor.continue()
            }
          } catch (e) {
            return callback(e)
          }
        })
      },
      loadLocalEntry: function (path, callback) {
        var stat, node
        try {
          var lookup = FS.lookupPath(path)
          node = lookup.node
          stat = FS.stat(path)
        } catch (e) {
          return callback(e)
        }
        if (FS.isDir(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode })
        } else if (FS.isFile(stat.mode)) {
          node.contents = MEMFS.getFileDataAsTypedArray(node)
          return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents })
        } else {
          return callback(new Error('node type not supported'))
        }
      },
      storeLocalEntry: function (path, entry, callback) {
        try {
          if (FS.isDir(entry['mode'])) {
            FS.mkdir(path, entry['mode'])
          } else if (FS.isFile(entry['mode'])) {
            FS.writeFile(path, entry['contents'], { canOwn: true })
          } else {
            return callback(new Error('node type not supported'))
          }
          FS.chmod(path, entry['mode'])
          FS.utime(path, entry['timestamp'], entry['timestamp'])
        } catch (e) {
          return callback(e)
        }
        callback(null)
      },
      removeLocalEntry: function (path, callback) {
        try {
          var lookup = FS.lookupPath(path)
          var stat = FS.stat(path)
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path)
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path)
          }
        } catch (e) {
          return callback(e)
        }
        callback(null)
      },
      loadRemoteEntry: function (store, path, callback) {
        var req = store.get(path)
        req.onsuccess = function (event) {
          callback(null, event.target.result)
        }
        req.onerror = function (e) {
          callback(this.error)
          e.preventDefault()
        }
      },
      storeRemoteEntry: function (store, path, entry, callback) {
        var req = store.put(entry, path)
        req.onsuccess = function () {
          callback(null)
        }
        req.onerror = function (e) {
          callback(this.error)
          e.preventDefault()
        }
      },
      removeRemoteEntry: function (store, path, callback) {
        var req = store.delete(path)
        req.onsuccess = function () {
          callback(null)
        }
        req.onerror = function (e) {
          callback(this.error)
          e.preventDefault()
        }
      },
      reconcile: function (src, dst, callback) {
        var total = 0
        var create = []
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key]
          var e2 = dst.entries[key]
          if (!e2 || e['timestamp'] > e2['timestamp']) {
            create.push(key)
            total++
          }
        })
        var remove = []
        Object.keys(dst.entries).forEach(function (key) {
          var e = dst.entries[key]
          var e2 = src.entries[key]
          if (!e2) {
            remove.push(key)
            total++
          }
        })
        if (!total) {
          return callback(null)
        }
        var errored = false
        var db = src.type === 'remote' ? src.db : dst.db
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite')
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME)
        function done(err) {
          if (err && !errored) {
            errored = true
            return callback(err)
          }
        }
        transaction.onerror = function (e) {
          done(this.error)
          e.preventDefault()
        }
        transaction.oncomplete = function (e) {
          if (!errored) {
            callback(null)
          }
        }
        create.sort().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, function (err, entry) {
              if (err) return done(err)
              IDBFS.storeLocalEntry(path, entry, done)
            })
          } else {
            IDBFS.loadLocalEntry(path, function (err, entry) {
              if (err) return done(err)
              IDBFS.storeRemoteEntry(store, path, entry, done)
            })
          }
        })
        remove
          .sort()
          .reverse()
          .forEach(function (path) {
            if (dst.type === 'local') {
              IDBFS.removeLocalEntry(path, done)
            } else {
              IDBFS.removeRemoteEntry(store, path, done)
            }
          })
      }
    }
    var FS = {
      root: null,
      mounts: [],
      devices: {},
      streams: [],
      nextInode: 1,
      nameTable: null,
      currentPath: '/',
      initialized: false,
      ignorePermissions: true,
      trackingDelegate: {},
      tracking: { openFlags: { READ: 1, WRITE: 2 } },
      ErrnoError: null,
      genericErrors: {},
      filesystems: null,
      syncFSRequests: 0,
      handleFSError: function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace()
        return ___setErrNo(e.errno)
      },
      lookupPath: function (path, opts) {
        path = PATH_FS.resolve(FS.cwd(), path)
        opts = opts || {}
        if (!path) return { path: '', node: null }
        var defaults = { follow_mount: true, recurse_count: 0 }
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key]
          }
        }
        if (opts.recurse_count > 8) {
          throw new FS.ErrnoError(32)
        }
        var parts = PATH.normalizeArray(
          path.split('/').filter(function (p) {
            return !!p
          }),
          false
        )
        var current = FS.root
        var current_path = '/'
        for (var i = 0; i < parts.length; i++) {
          var islast = i === parts.length - 1
          if (islast && opts.parent) {
            break
          }
          current = FS.lookupNode(current, parts[i])
          current_path = PATH.join2(current_path, parts[i])
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root
            }
          }
          if (!islast || opts.follow) {
            var count = 0
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path)
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link)
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count })
              current = lookup.node
              if (count++ > 40) {
                throw new FS.ErrnoError(32)
              }
            }
          }
        }
        return { path: current_path, node: current }
      },
      getPath: function (node) {
        var path
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint
            if (!path) return mount
            return mount[mount.length - 1] !== '/' ? mount + '/' + path : mount + path
          }
          path = path ? node.name + '/' + path : node.name
          node = node.parent
        }
      },
      hashName: function (parentid, name) {
        var hash = 0
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length
      },
      hashAddNode: function (node) {
        var hash = FS.hashName(node.parent.id, node.name)
        node.name_next = FS.nameTable[hash]
        FS.nameTable[hash] = node
      },
      hashRemoveNode: function (node) {
        var hash = FS.hashName(node.parent.id, node.name)
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next
        } else {
          var current = FS.nameTable[hash]
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next
              break
            }
            current = current.name_next
          }
        }
      },
      lookupNode: function (parent, name) {
        var errCode = FS.mayLookup(parent)
        if (errCode) {
          throw new FS.ErrnoError(errCode, parent)
        }
        var hash = FS.hashName(parent.id, name)
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name
          if (node.parent.id === parent.id && nodeName === name) {
            return node
          }
        }
        return FS.lookup(parent, name)
      },
      createNode: function (parent, name, mode, rdev) {
        var node = new FS.FSNode(parent, name, mode, rdev)
        FS.hashAddNode(node)
        return node
      },
      destroyNode: function (node) {
        FS.hashRemoveNode(node)
      },
      isRoot: function (node) {
        return node === node.parent
      },
      isMountpoint: function (node) {
        return !!node.mounted
      },
      isFile: function (mode) {
        return (mode & 61440) === 32768
      },
      isDir: function (mode) {
        return (mode & 61440) === 16384
      },
      isLink: function (mode) {
        return (mode & 61440) === 40960
      },
      isChrdev: function (mode) {
        return (mode & 61440) === 8192
      },
      isBlkdev: function (mode) {
        return (mode & 61440) === 24576
      },
      isFIFO: function (mode) {
        return (mode & 61440) === 4096
      },
      isSocket: function (mode) {
        return (mode & 49152) === 49152
      },
      flagModes: {
        r: 0,
        rs: 1052672,
        'r+': 2,
        w: 577,
        wx: 705,
        xw: 705,
        'w+': 578,
        'wx+': 706,
        'xw+': 706,
        a: 1089,
        ax: 1217,
        xa: 1217,
        'a+': 1090,
        'ax+': 1218,
        'xa+': 1218
      },
      modeStringToFlags: function (str) {
        var flags = FS.flagModes[str]
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str)
        }
        return flags
      },
      flagsToPermissionString: function (flag) {
        var perms = ['r', 'w', 'rw'][flag & 3]
        if (flag & 512) {
          perms += 'w'
        }
        return perms
      },
      nodePermissions: function (node, perms) {
        if (FS.ignorePermissions) {
          return 0
        }
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return 2
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return 2
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return 2
        }
        return 0
      },
      mayLookup: function (dir) {
        var errCode = FS.nodePermissions(dir, 'x')
        if (errCode) return errCode
        if (!dir.node_ops.lookup) return 2
        return 0
      },
      mayCreate: function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name)
          return 20
        } catch (e) {}
        return FS.nodePermissions(dir, 'wx')
      },
      mayDelete: function (dir, name, isdir) {
        var node
        try {
          node = FS.lookupNode(dir, name)
        } catch (e) {
          return e.errno
        }
        var errCode = FS.nodePermissions(dir, 'wx')
        if (errCode) {
          return errCode
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31
          }
        }
        return 0
      },
      mayOpen: function (node, flags) {
        if (!node) {
          return 44
        }
        if (FS.isLink(node.mode)) {
          return 32
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || flags & 512) {
            return 31
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags))
      },
      MAX_OPEN_FDS: 4096,
      nextfd: function (fd_start, fd_end) {
        fd_start = fd_start || 0
        fd_end = fd_end || FS.MAX_OPEN_FDS
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd
          }
        }
        throw new FS.ErrnoError(33)
      },
      getStream: function (fd) {
        return FS.streams[fd]
      },
      createStream: function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function () {}
          FS.FSStream.prototype = {
            object: {
              get: function () {
                return this.node
              },
              set: function (val) {
                this.node = val
              }
            },
            isRead: {
              get: function () {
                return (this.flags & 2097155) !== 1
              }
            },
            isWrite: {
              get: function () {
                return (this.flags & 2097155) !== 0
              }
            },
            isAppend: {
              get: function () {
                return this.flags & 1024
              }
            }
          }
        }
        var newStream = new FS.FSStream()
        for (var p in stream) {
          newStream[p] = stream[p]
        }
        stream = newStream
        var fd = FS.nextfd(fd_start, fd_end)
        stream.fd = fd
        FS.streams[fd] = stream
        return stream
      },
      closeStream: function (fd) {
        FS.streams[fd] = null
      },
      chrdev_stream_ops: {
        open: function (stream) {
          var device = FS.getDevice(stream.node.rdev)
          stream.stream_ops = device.stream_ops
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream)
          }
        },
        llseek: function () {
          throw new FS.ErrnoError(70)
        }
      },
      major: function (dev) {
        return dev >> 8
      },
      minor: function (dev) {
        return dev & 255
      },
      makedev: function (ma, mi) {
        return (ma << 8) | mi
      },
      registerDevice: function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops }
      },
      getDevice: function (dev) {
        return FS.devices[dev]
      },
      getMounts: function (mount) {
        var mounts = []
        var check = [mount]
        while (check.length) {
          var m = check.pop()
          mounts.push(m)
          check.push.apply(check, m.mounts)
        }
        return mounts
      },
      syncfs: function (populate, callback) {
        if (typeof populate === 'function') {
          callback = populate
          populate = false
        }
        FS.syncFSRequests++
        if (FS.syncFSRequests > 1) {
          err(
            'warning: ' +
              FS.syncFSRequests +
              ' FS.syncfs operations in flight at once, probably just doing extra work'
          )
        }
        var mounts = FS.getMounts(FS.root.mount)
        var completed = 0
        function doCallback(errCode) {
          FS.syncFSRequests--
          return callback(errCode)
        }
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true
              return doCallback(errCode)
            }
            return
          }
          if (++completed >= mounts.length) {
            doCallback(null)
          }
        }
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null)
          }
          mount.type.syncfs(mount, populate, done)
        })
      },
      mount: function (type, opts, mountpoint) {
        var root = mountpoint === '/'
        var pseudo = !mountpoint
        var node
        if (root && FS.root) {
          throw new FS.ErrnoError(10)
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false })
          mountpoint = lookup.path
          node = lookup.node
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10)
          }
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54)
          }
        }
        var mount = { type: type, opts: opts, mountpoint: mountpoint, mounts: [] }
        var mountRoot = type.mount(mount)
        mountRoot.mount = mount
        mount.root = mountRoot
        if (root) {
          FS.root = mountRoot
        } else if (node) {
          node.mounted = mount
          if (node.mount) {
            node.mount.mounts.push(mount)
          }
        }
        return mountRoot
      },
      unmount: function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false })
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28)
        }
        var node = lookup.node
        var mount = node.mounted
        var mounts = FS.getMounts(mount)
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash]
          while (current) {
            var next = current.name_next
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current)
            }
            current = next
          }
        })
        node.mounted = null
        var idx = node.mount.mounts.indexOf(mount)
        node.mount.mounts.splice(idx, 1)
      },
      lookup: function (parent, name) {
        return parent.node_ops.lookup(parent, name)
      },
      mknod: function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true })
        var parent = lookup.node
        var name = PATH.basename(path)
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28)
        }
        var errCode = FS.mayCreate(parent, name)
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63)
        }
        return parent.node_ops.mknod(parent, name, mode, dev)
      },
      create: function (path, mode) {
        mode = mode !== undefined ? mode : 438
        mode &= 4095
        mode |= 32768
        return FS.mknod(path, mode, 0)
      },
      mkdir: function (path, mode) {
        mode = mode !== undefined ? mode : 511
        mode &= 511 | 512
        mode |= 16384
        return FS.mknod(path, mode, 0)
      },
      mkdirTree: function (path, mode) {
        var dirs = path.split('/')
        var d = ''
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue
          d += '/' + dirs[i]
          try {
            FS.mkdir(d, mode)
          } catch (e) {
            if (e.errno != 20) throw e
          }
        }
      },
      mkdev: function (path, mode, dev) {
        if (typeof dev === 'undefined') {
          dev = mode
          mode = 438
        }
        mode |= 8192
        return FS.mknod(path, mode, dev)
      },
      symlink: function (oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44)
        }
        var lookup = FS.lookupPath(newpath, { parent: true })
        var parent = lookup.node
        if (!parent) {
          throw new FS.ErrnoError(44)
        }
        var newname = PATH.basename(newpath)
        var errCode = FS.mayCreate(parent, newname)
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63)
        }
        return parent.node_ops.symlink(parent, newname, oldpath)
      },
      rename: function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path)
        var new_dirname = PATH.dirname(new_path)
        var old_name = PATH.basename(old_path)
        var new_name = PATH.basename(new_path)
        var lookup, old_dir, new_dir
        try {
          lookup = FS.lookupPath(old_path, { parent: true })
          old_dir = lookup.node
          lookup = FS.lookupPath(new_path, { parent: true })
          new_dir = lookup.node
        } catch (e) {
          throw new FS.ErrnoError(10)
        }
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44)
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75)
        }
        var old_node = FS.lookupNode(old_dir, old_name)
        var relative = PATH_FS.relative(old_path, new_dirname)
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28)
        }
        relative = PATH_FS.relative(new_path, old_dirname)
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55)
        }
        var new_node
        try {
          new_node = FS.lookupNode(new_dir, new_name)
        } catch (e) {}
        if (old_node === new_node) {
          return
        }
        var isdir = FS.isDir(old_node.mode)
        var errCode = FS.mayDelete(old_dir, old_name, isdir)
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        errCode = new_node
          ? FS.mayDelete(new_dir, new_name, isdir)
          : FS.mayCreate(new_dir, new_name)
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63)
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10)
        }
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w')
          if (errCode) {
            throw new FS.ErrnoError(errCode)
          }
        }
        try {
          if (FS.trackingDelegate['willMovePath']) {
            FS.trackingDelegate['willMovePath'](old_path, new_path)
          }
        } catch (e) {
          err(
            "FS.trackingDelegate['willMovePath']('" +
              old_path +
              "', '" +
              new_path +
              "') threw an exception: " +
              e.message
          )
        }
        FS.hashRemoveNode(old_node)
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name)
        } catch (e) {
          throw e
        } finally {
          FS.hashAddNode(old_node)
        }
        try {
          if (FS.trackingDelegate['onMovePath'])
            FS.trackingDelegate['onMovePath'](old_path, new_path)
        } catch (e) {
          err(
            "FS.trackingDelegate['onMovePath']('" +
              old_path +
              "', '" +
              new_path +
              "') threw an exception: " +
              e.message
          )
        }
      },
      rmdir: function (path) {
        var lookup = FS.lookupPath(path, { parent: true })
        var parent = lookup.node
        var name = PATH.basename(path)
        var node = FS.lookupNode(parent, name)
        var errCode = FS.mayDelete(parent, name, true)
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63)
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10)
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path)
          }
        } catch (e) {
          err(
            "FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message
          )
        }
        parent.node_ops.rmdir(parent, name)
        FS.destroyNode(node)
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path)
        } catch (e) {
          err(
            "FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message
          )
        }
      },
      readdir: function (path) {
        var lookup = FS.lookupPath(path, { follow: true })
        var node = lookup.node
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54)
        }
        return node.node_ops.readdir(node)
      },
      unlink: function (path) {
        var lookup = FS.lookupPath(path, { parent: true })
        var parent = lookup.node
        var name = PATH.basename(path)
        var node = FS.lookupNode(parent, name)
        var errCode = FS.mayDelete(parent, name, false)
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63)
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10)
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path)
          }
        } catch (e) {
          err(
            "FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message
          )
        }
        parent.node_ops.unlink(parent, name)
        FS.destroyNode(node)
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path)
        } catch (e) {
          err(
            "FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message
          )
        }
      },
      readlink: function (path) {
        var lookup = FS.lookupPath(path)
        var link = lookup.node
        if (!link) {
          throw new FS.ErrnoError(44)
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28)
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link))
      },
      stat: function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow })
        var node = lookup.node
        if (!node) {
          throw new FS.ErrnoError(44)
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63)
        }
        return node.node_ops.getattr(node)
      },
      lstat: function (path) {
        return FS.stat(path, true)
      },
      chmod: function (path, mode, dontFollow) {
        var node
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow })
          node = lookup.node
        } else {
          node = path
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63)
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        })
      },
      lchmod: function (path, mode) {
        FS.chmod(path, mode, true)
      },
      fchmod: function (fd, mode) {
        var stream = FS.getStream(fd)
        if (!stream) {
          throw new FS.ErrnoError(8)
        }
        FS.chmod(stream.node, mode)
      },
      chown: function (path, uid, gid, dontFollow) {
        var node
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow })
          node = lookup.node
        } else {
          node = path
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63)
        }
        node.node_ops.setattr(node, { timestamp: Date.now() })
      },
      lchown: function (path, uid, gid) {
        FS.chown(path, uid, gid, true)
      },
      fchown: function (fd, uid, gid) {
        var stream = FS.getStream(fd)
        if (!stream) {
          throw new FS.ErrnoError(8)
        }
        FS.chown(stream.node, uid, gid)
      },
      truncate: function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28)
        }
        var node
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true })
          node = lookup.node
        } else {
          node = path
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63)
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31)
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28)
        }
        var errCode = FS.nodePermissions(node, 'w')
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        node.node_ops.setattr(node, { size: len, timestamp: Date.now() })
      },
      ftruncate: function (fd, len) {
        var stream = FS.getStream(fd)
        if (!stream) {
          throw new FS.ErrnoError(8)
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28)
        }
        FS.truncate(stream.node, len)
      },
      utime: function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true })
        var node = lookup.node
        node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) })
      },
      open: function (path, flags, mode, fd_start, fd_end) {
        if (path === '') {
          throw new FS.ErrnoError(44)
        }
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags
        mode = typeof mode === 'undefined' ? 438 : mode
        if (flags & 64) {
          mode = (mode & 4095) | 32768
        } else {
          mode = 0
        }
        var node
        if (typeof path === 'object') {
          node = path
        } else {
          path = PATH.normalize(path)
          try {
            var lookup = FS.lookupPath(path, { follow: !(flags & 131072) })
            node = lookup.node
          } catch (e) {}
        }
        var created = false
        if (flags & 64) {
          if (node) {
            if (flags & 128) {
              throw new FS.ErrnoError(20)
            }
          } else {
            node = FS.mknod(path, mode, 0)
            created = true
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44)
        }
        if (FS.isChrdev(node.mode)) {
          flags &= ~512
        }
        if (flags & 65536 && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54)
        }
        if (!created) {
          var errCode = FS.mayOpen(node, flags)
          if (errCode) {
            throw new FS.ErrnoError(errCode)
          }
        }
        if (flags & 512) {
          FS.truncate(node, 0)
        }
        flags &= ~(128 | 512)
        var stream = FS.createStream(
          {
            node: node,
            path: FS.getPath(node),
            flags: flags,
            seekable: true,
            position: 0,
            stream_ops: node.stream_ops,
            ungotten: [],
            error: false
          },
          fd_start,
          fd_end
        )
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream)
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {}
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1
            err('FS.trackingDelegate error on read file: ' + path)
          }
        }
        try {
          if (FS.trackingDelegate['onOpenFile']) {
            var trackingFlags = 0
            if ((flags & 2097155) !== 1) {
              trackingFlags |= FS.tracking.openFlags.READ
            }
            if ((flags & 2097155) !== 0) {
              trackingFlags |= FS.tracking.openFlags.WRITE
            }
            FS.trackingDelegate['onOpenFile'](path, trackingFlags)
          }
        } catch (e) {
          err(
            "FS.trackingDelegate['onOpenFile']('" +
              path +
              "', flags) threw an exception: " +
              e.message
          )
        }
        return stream
      },
      close: function (stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8)
        }
        if (stream.getdents) stream.getdents = null
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream)
          }
        } catch (e) {
          throw e
        } finally {
          FS.closeStream(stream.fd)
        }
        stream.fd = null
      },
      isClosed: function (stream) {
        return stream.fd === null
      },
      llseek: function (stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8)
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70)
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28)
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence)
        stream.ungotten = []
        return stream.position
      },
      read: function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28)
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8)
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8)
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31)
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28)
        }
        var seeking = typeof position !== 'undefined'
        if (!seeking) {
          position = stream.position
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70)
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position)
        if (!seeking) stream.position += bytesRead
        return bytesRead
      },
      write: function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28)
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8)
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8)
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31)
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28)
        }
        if (stream.flags & 1024) {
          FS.llseek(stream, 0, 2)
        }
        var seeking = typeof position !== 'undefined'
        if (!seeking) {
          position = stream.position
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70)
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn)
        if (!seeking) stream.position += bytesWritten
        try {
          if (stream.path && FS.trackingDelegate['onWriteToFile'])
            FS.trackingDelegate['onWriteToFile'](stream.path)
        } catch (e) {
          err(
            "FS.trackingDelegate['onWriteToFile']('" +
              stream.path +
              "') threw an exception: " +
              e.message
          )
        }
        return bytesWritten
      },
      allocate: function (stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8)
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28)
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8)
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43)
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138)
        }
        stream.stream_ops.allocate(stream, offset, length)
      },
      mmap: function (stream, buffer, offset, length, position, prot, flags) {
        if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2)
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2)
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43)
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags)
      },
      msync: function (stream, buffer, offset, length, mmapFlags) {
        if (!stream || !stream.stream_ops.msync) {
          return 0
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags)
      },
      munmap: function (stream) {
        return 0
      },
      ioctl: function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59)
        }
        return stream.stream_ops.ioctl(stream, cmd, arg)
      },
      readFile: function (path, opts) {
        opts = opts || {}
        opts.flags = opts.flags || 'r'
        opts.encoding = opts.encoding || 'binary'
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"')
        }
        var ret
        var stream = FS.open(path, opts.flags)
        var stat = FS.stat(path)
        var length = stat.size
        var buf = new Uint8Array(length)
        FS.read(stream, buf, 0, length, 0)
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0)
        } else if (opts.encoding === 'binary') {
          ret = buf
        }
        FS.close(stream)
        return ret
      },
      writeFile: function (path, data, opts) {
        opts = opts || {}
        opts.flags = opts.flags || 'w'
        var stream = FS.open(path, opts.flags, opts.mode)
        if (typeof data === 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data) + 1)
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length)
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn)
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn)
        } else {
          throw new Error('Unsupported data type')
        }
        FS.close(stream)
      },
      cwd: function () {
        return FS.currentPath
      },
      chdir: function (path) {
        var lookup = FS.lookupPath(path, { follow: true })
        if (lookup.node === null) {
          throw new FS.ErrnoError(44)
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54)
        }
        var errCode = FS.nodePermissions(lookup.node, 'x')
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        FS.currentPath = lookup.path
      },
      createDefaultDirectories: function () {
        FS.mkdir('/tmp')
        FS.mkdir('/home')
        FS.mkdir('/home/web_user')
      },
      createDefaultDevices: function () {
        FS.mkdir('/dev')
        FS.registerDevice(FS.makedev(1, 3), {
          read: function () {
            return 0
          },
          write: function (stream, buffer, offset, length, pos) {
            return length
          }
        })
        FS.mkdev('/dev/null', FS.makedev(1, 3))
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops)
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops)
        FS.mkdev('/dev/tty', FS.makedev(5, 0))
        FS.mkdev('/dev/tty1', FS.makedev(6, 0))
        var random_device
        if (typeof crypto === 'object' && typeof crypto['getRandomValues'] === 'function') {
          var randomBuffer = new Uint8Array(1)
          random_device = function () {
            crypto.getRandomValues(randomBuffer)
            return randomBuffer[0]
          }
        } else {
        }
        if (!random_device) {
          random_device = function () {
            abort('random_device')
          }
        }
        FS.createDevice('/dev', 'random', random_device)
        FS.createDevice('/dev', 'urandom', random_device)
        FS.mkdir('/dev/shm')
        FS.mkdir('/dev/shm/tmp')
      },
      createSpecialDirectories: function () {
        FS.mkdir('/proc')
        FS.mkdir('/proc/self')
        FS.mkdir('/proc/self/fd')
        FS.mount(
          {
            mount: function () {
              var node = FS.createNode('/proc/self', 'fd', 16384 | 511, 73)
              node.node_ops = {
                lookup: function (parent, name) {
                  var fd = +name
                  var stream = FS.getStream(fd)
                  if (!stream) throw new FS.ErrnoError(8)
                  var ret = {
                    parent: null,
                    mount: { mountpoint: 'fake' },
                    node_ops: {
                      readlink: function () {
                        return stream.path
                      }
                    }
                  }
                  ret.parent = ret
                  return ret
                }
              }
              return node
            }
          },
          {},
          '/proc/self/fd'
        )
      },
      createStandardStreams: function () {
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin'])
        } else {
          FS.symlink('/dev/tty', '/dev/stdin')
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout'])
        } else {
          FS.symlink('/dev/tty', '/dev/stdout')
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr'])
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr')
        }
        var stdin = FS.open('/dev/stdin', 'r')
        var stdout = FS.open('/dev/stdout', 'w')
        var stderr = FS.open('/dev/stderr', 'w')
      },
      ensureErrnoError: function () {
        if (FS.ErrnoError) return
        FS.ErrnoError = function ErrnoError(errno, node) {
          this.node = node
          this.setErrno = function (errno) {
            this.errno = errno
          }
          this.setErrno(errno)
          this.message = 'FS error'
        }
        FS.ErrnoError.prototype = new Error()
        FS.ErrnoError.prototype.constructor = FS.ErrnoError
        ;[44].forEach(function (code) {
          FS.genericErrors[code] = new FS.ErrnoError(code)
          FS.genericErrors[code].stack = '<generic error, no stack>'
        })
      },
      staticInit: function () {
        FS.ensureErrnoError()
        FS.nameTable = new Array(4096)
        FS.mount(MEMFS, {}, '/')
        FS.createDefaultDirectories()
        FS.createDefaultDevices()
        FS.createSpecialDirectories()
        FS.filesystems = { MEMFS: MEMFS, IDBFS: IDBFS }
      },
      init: function (input, output, error) {
        FS.init.initialized = true
        FS.ensureErrnoError()
        Module['stdin'] = input || Module['stdin']
        Module['stdout'] = output || Module['stdout']
        Module['stderr'] = error || Module['stderr']
        FS.createStandardStreams()
      },
      quit: function () {
        FS.init.initialized = false
        var fflush = Module['_fflush']
        if (fflush) fflush(0)
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i]
          if (!stream) {
            continue
          }
          FS.close(stream)
        }
      },
      getMode: function (canRead, canWrite) {
        var mode = 0
        if (canRead) mode |= 292 | 73
        if (canWrite) mode |= 146
        return mode
      },
      joinPath: function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts)
        if (forceRelative && path[0] == '/') path = path.substr(1)
        return path
      },
      absolutePath: function (relative, base) {
        return PATH_FS.resolve(base, relative)
      },
      standardizePath: function (path) {
        return PATH.normalize(path)
      },
      findObject: function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink)
        if (ret.exists) {
          return ret.object
        } else {
          ___setErrNo(ret.error)
          return null
        }
      },
      analyzePath: function (path, dontResolveLastLink) {
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink })
          path = lookup.path
        } catch (e) {}
        var ret = {
          isRoot: false,
          exists: false,
          error: 0,
          name: null,
          path: null,
          object: null,
          parentExists: false,
          parentPath: null,
          parentObject: null
        }
        try {
          var lookup = FS.lookupPath(path, { parent: true })
          ret.parentExists = true
          ret.parentPath = lookup.path
          ret.parentObject = lookup.node
          ret.name = PATH.basename(path)
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink })
          ret.exists = true
          ret.path = lookup.path
          ret.object = lookup.node
          ret.name = lookup.node.name
          ret.isRoot = lookup.path === '/'
        } catch (e) {
          ret.error = e.errno
        }
        return ret
      },
      createFolder: function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name)
        var mode = FS.getMode(canRead, canWrite)
        return FS.mkdir(path, mode)
      },
      createPath: function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent)
        var parts = path.split('/').reverse()
        while (parts.length) {
          var part = parts.pop()
          if (!part) continue
          var current = PATH.join2(parent, part)
          try {
            FS.mkdir(current)
          } catch (e) {}
          parent = current
        }
        return current
      },
      createFile: function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name)
        var mode = FS.getMode(canRead, canWrite)
        return FS.create(path, mode)
      },
      createDataFile: function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name
          ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name)
          : parent
        var mode = FS.getMode(canRead, canWrite)
        var node = FS.create(path, mode)
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length)
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i)
            data = arr
          }
          FS.chmod(node, mode | 146)
          var stream = FS.open(node, 'w')
          FS.write(stream, data, 0, data.length, 0, canOwn)
          FS.close(stream)
          FS.chmod(node, mode)
        }
        return node
      },
      createDevice: function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name)
        var mode = FS.getMode(!!input, !!output)
        if (!FS.createDevice.major) FS.createDevice.major = 64
        var dev = FS.makedev(FS.createDevice.major++, 0)
        FS.registerDevice(dev, {
          open: function (stream) {
            stream.seekable = false
          },
          close: function (stream) {
            if (output && output.buffer && output.buffer.length) {
              output(10)
            }
          },
          read: function (stream, buffer, offset, length, pos) {
            var bytesRead = 0
            for (var i = 0; i < length; i++) {
              var result
              try {
                result = input()
              } catch (e) {
                throw new FS.ErrnoError(29)
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6)
              }
              if (result === null || result === undefined) break
              bytesRead++
              buffer[offset + i] = result
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now()
            }
            return bytesRead
          },
          write: function (stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset + i])
              } catch (e) {
                throw new FS.ErrnoError(29)
              }
            }
            if (length) {
              stream.node.timestamp = Date.now()
            }
            return i
          }
        })
        return FS.mkdev(path, mode, dev)
      },
      createLink: function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name)
        return FS.symlink(target, path)
      },
      forceLoadFile: function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true
        var success = true
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error(
            'Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.'
          )
        } else if (read_) {
          try {
            obj.contents = intArrayFromString(read_(obj.url), true)
            obj.usedBytes = obj.contents.length
          } catch (e) {
            success = false
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.')
        }
        if (!success) ___setErrNo(29)
        return success
      },
      createLazyFile: function (parent, name, url, canRead, canWrite) {
        function LazyUint8Array() {
          this.lengthKnown = false
          this.chunks = []
        }
        LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
          if (idx > this.length - 1 || idx < 0) {
            return undefined
          }
          var chunkOffset = idx % this.chunkSize
          var chunkNum = (idx / this.chunkSize) | 0
          return this.getter(chunkNum)[chunkOffset]
        }
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter
        }
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          var xhr = new XMLHttpRequest()
          xhr.open('HEAD', url, false)
          xhr.send(null)
          if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
            throw new Error("Couldn't load " + url + '. Status: ' + xhr.status)
          var datalength = Number(xhr.getResponseHeader('Content-length'))
          var header
          var hasByteServing =
            (header = xhr.getResponseHeader('Accept-Ranges')) && header === 'bytes'
          var usesGzip = (header = xhr.getResponseHeader('Content-Encoding')) && header === 'gzip'
          var chunkSize = 1024 * 1024
          if (!hasByteServing) chunkSize = datalength
          var doXHR = function (from, to) {
            if (from > to)
              throw new Error('invalid range (' + from + ', ' + to + ') or no bytes requested!')
            if (to > datalength - 1)
              throw new Error('only ' + datalength + ' bytes available! programmer error!')
            var xhr = new XMLHttpRequest()
            xhr.open('GET', url, false)
            if (datalength !== chunkSize) xhr.setRequestHeader('Range', 'bytes=' + from + '-' + to)
            if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer'
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined')
            }
            xhr.send(null)
            if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
              throw new Error("Couldn't load " + url + '. Status: ' + xhr.status)
            if (xhr.response !== undefined) {
              return new Uint8Array(xhr.response || [])
            } else {
              return intArrayFromString(xhr.responseText || '', true)
            }
          }
          var lazyArray = this
          lazyArray.setDataGetter(function (chunkNum) {
            var start = chunkNum * chunkSize
            var end = (chunkNum + 1) * chunkSize - 1
            end = Math.min(end, datalength - 1)
            if (typeof lazyArray.chunks[chunkNum] === 'undefined') {
              lazyArray.chunks[chunkNum] = doXHR(start, end)
            }
            if (typeof lazyArray.chunks[chunkNum] === 'undefined') throw new Error('doXHR failed!')
            return lazyArray.chunks[chunkNum]
          })
          if (usesGzip || !datalength) {
            chunkSize = datalength = 1
            datalength = this.getter(0).length
            chunkSize = datalength
            out('LazyFiles on gzip forces download of the whole file when length is accessed')
          }
          this._length = datalength
          this._chunkSize = chunkSize
          this.lengthKnown = true
        }
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER)
            throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc'
          var lazyArray = new LazyUint8Array()
          Object.defineProperties(lazyArray, {
            length: {
              get: function () {
                if (!this.lengthKnown) {
                  this.cacheLength()
                }
                return this._length
              }
            },
            chunkSize: {
              get: function () {
                if (!this.lengthKnown) {
                  this.cacheLength()
                }
                return this._chunkSize
              }
            }
          })
          var properties = { isDevice: false, contents: lazyArray }
        } else {
          var properties = { isDevice: false, url: url }
        }
        var node = FS.createFile(parent, name, properties, canRead, canWrite)
        if (properties.contents) {
          node.contents = properties.contents
        } else if (properties.url) {
          node.contents = null
          node.url = properties.url
        }
        Object.defineProperties(node, {
          usedBytes: {
            get: function () {
              return this.contents.length
            }
          }
        })
        var stream_ops = {}
        var keys = Object.keys(node.stream_ops)
        keys.forEach(function (key) {
          var fn = node.stream_ops[key]
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(29)
            }
            return fn.apply(null, arguments)
          }
        })
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(29)
          }
          var contents = stream.node.contents
          if (position >= contents.length) return 0
          var size = Math.min(contents.length - position, length)
          if (contents.slice) {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i]
            }
          } else {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents.get(position + i)
            }
          }
          return size
        }
        node.stream_ops = stream_ops
        return node
      },
      createPreloadedFile: function (
        parent,
        name,
        url,
        canRead,
        canWrite,
        onload,
        onerror,
        dontCreateFile,
        canOwn,
        preFinish
      ) {
        Browser.init()
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent
        var dep = getUniqueRunDependency('cp ' + fullname)
        function processData(byteArray) {
          function finish(byteArray) {
            if (preFinish) preFinish()
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn)
            }
            if (onload) onload()
            removeRunDependency(dep)
          }
          var handled = false
          Module['preloadPlugins'].forEach(function (plugin) {
            if (handled) return
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function () {
                if (onerror) onerror()
                removeRunDependency(dep)
              })
              handled = true
            }
          })
          if (!handled) finish(byteArray)
        }
        addRunDependency(dep)
        if (typeof url == 'string') {
          Browser.asyncLoad(
            url,
            function (byteArray) {
              processData(byteArray)
            },
            onerror
          )
        } else {
          processData(url)
        }
      },
      indexedDB: function () {
        return (
          window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
        )
      },
      DB_NAME: function () {
        return 'EM_FS_' + window.location.pathname
      },
      DB_VERSION: 20,
      DB_STORE_NAME: 'FILE_DATA',
      saveFilesToDB: function (paths, onload, onerror) {
        onload = onload || function () {}
        onerror = onerror || function () {}
        var indexedDB = FS.indexedDB()
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
        } catch (e) {
          return onerror(e)
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          out('creating db')
          var db = openRequest.result
          db.createObjectStore(FS.DB_STORE_NAME)
        }
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite')
          var files = transaction.objectStore(FS.DB_STORE_NAME)
          var ok = 0,
            fail = 0,
            total = paths.length
          function finish() {
            if (fail == 0) onload()
            else onerror()
          }
          paths.forEach(function (path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path)
            putRequest.onsuccess = function putRequest_onsuccess() {
              ok++
              if (ok + fail == total) finish()
            }
            putRequest.onerror = function putRequest_onerror() {
              fail++
              if (ok + fail == total) finish()
            }
          })
          transaction.onerror = onerror
        }
        openRequest.onerror = onerror
      },
      loadFilesFromDB: function (paths, onload, onerror) {
        onload = onload || function () {}
        onerror = onerror || function () {}
        var indexedDB = FS.indexedDB()
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
        } catch (e) {
          return onerror(e)
        }
        openRequest.onupgradeneeded = onerror
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly')
          } catch (e) {
            onerror(e)
            return
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME)
          var ok = 0,
            fail = 0,
            total = paths.length
          function finish() {
            if (fail == 0) onload()
            else onerror()
          }
          paths.forEach(function (path) {
            var getRequest = files.get(path)
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path)
              }
              FS.createDataFile(
                PATH.dirname(path),
                PATH.basename(path),
                getRequest.result,
                true,
                true,
                true
              )
              ok++
              if (ok + fail == total) finish()
            }
            getRequest.onerror = function getRequest_onerror() {
              fail++
              if (ok + fail == total) finish()
            }
          })
          transaction.onerror = onerror
        }
        openRequest.onerror = onerror
      }
    }
    var SYSCALLS = {
      mappings: {},
      DEFAULT_POLLMASK: 5,
      umask: 511,
      calculateAt: function (dirfd, path) {
        if (path[0] !== '/') {
          var dir
          if (dirfd === -100) {
            dir = FS.cwd()
          } else {
            var dirstream = FS.getStream(dirfd)
            if (!dirstream) throw new FS.ErrnoError(8)
            dir = dirstream.path
          }
          path = PATH.join2(dir, path)
        }
        return path
      },
      doStat: function (func, path, buf) {
        try {
          var stat = func(path)
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            return -54
          }
          throw e
        }
        HEAP32[buf >> 2] = stat.dev
        HEAP32[(buf + 4) >> 2] = 0
        HEAP32[(buf + 8) >> 2] = stat.ino
        HEAP32[(buf + 12) >> 2] = stat.mode
        HEAP32[(buf + 16) >> 2] = stat.nlink
        HEAP32[(buf + 20) >> 2] = stat.uid
        HEAP32[(buf + 24) >> 2] = stat.gid
        HEAP32[(buf + 28) >> 2] = stat.rdev
        HEAP32[(buf + 32) >> 2] = 0
        ;(tempI64 = [
          stat.size >>> 0,
          ((tempDouble = stat.size),
          +Math_abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
              : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
            : 0)
        ]),
          (HEAP32[(buf + 40) >> 2] = tempI64[0]),
          (HEAP32[(buf + 44) >> 2] = tempI64[1])
        HEAP32[(buf + 48) >> 2] = 4096
        HEAP32[(buf + 52) >> 2] = stat.blocks
        HEAP32[(buf + 56) >> 2] = (stat.atime.getTime() / 1e3) | 0
        HEAP32[(buf + 60) >> 2] = 0
        HEAP32[(buf + 64) >> 2] = (stat.mtime.getTime() / 1e3) | 0
        HEAP32[(buf + 68) >> 2] = 0
        HEAP32[(buf + 72) >> 2] = (stat.ctime.getTime() / 1e3) | 0
        HEAP32[(buf + 76) >> 2] = 0
        ;(tempI64 = [
          stat.ino >>> 0,
          ((tempDouble = stat.ino),
          +Math_abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
              : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
            : 0)
        ]),
          (HEAP32[(buf + 80) >> 2] = tempI64[0]),
          (HEAP32[(buf + 84) >> 2] = tempI64[1])
        return 0
      },
      doMsync: function (addr, stream, len, flags, offset) {
        var buffer = HEAPU8.slice(addr, addr + len)
        FS.msync(stream, buffer, offset, len, flags)
      },
      doMkdir: function (path, mode) {
        path = PATH.normalize(path)
        if (path[path.length - 1] === '/') path = path.substr(0, path.length - 1)
        FS.mkdir(path, mode, 0)
        return 0
      },
      doMknod: function (path, mode, dev) {
        switch (mode & 61440) {
          case 32768:
          case 8192:
          case 24576:
          case 4096:
          case 49152:
            break
          default:
            return -28
        }
        FS.mknod(path, mode, dev)
        return 0
      },
      doReadlink: function (path, buf, bufsize) {
        if (bufsize <= 0) return -28
        var ret = FS.readlink(path)
        var len = Math.min(bufsize, lengthBytesUTF8(ret))
        var endChar = HEAP8[buf + len]
        stringToUTF8(ret, buf, bufsize + 1)
        HEAP8[buf + len] = endChar
        return len
      },
      doAccess: function (path, amode) {
        if (amode & ~7) {
          return -28
        }
        var node
        var lookup = FS.lookupPath(path, { follow: true })
        node = lookup.node
        if (!node) {
          return -44
        }
        var perms = ''
        if (amode & 4) perms += 'r'
        if (amode & 2) perms += 'w'
        if (amode & 1) perms += 'x'
        if (perms && FS.nodePermissions(node, perms)) {
          return -2
        }
        return 0
      },
      doDup: function (path, flags, suggestFD) {
        var suggest = FS.getStream(suggestFD)
        if (suggest) FS.close(suggest)
        return FS.open(path, flags, 0, suggestFD, suggestFD).fd
      },
      doReadv: function (stream, iov, iovcnt, offset) {
        var ret = 0
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(iov + i * 8) >> 2]
          var len = HEAP32[(iov + (i * 8 + 4)) >> 2]
          var curr = FS.read(stream, HEAP8, ptr, len, offset)
          if (curr < 0) return -1
          ret += curr
          if (curr < len) break
        }
        return ret
      },
      doWritev: function (stream, iov, iovcnt, offset) {
        var ret = 0
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(iov + i * 8) >> 2]
          var len = HEAP32[(iov + (i * 8 + 4)) >> 2]
          var curr = FS.write(stream, HEAP8, ptr, len, offset)
          if (curr < 0) return -1
          ret += curr
        }
        return ret
      },
      varargs: undefined,
      get: function () {
        SYSCALLS.varargs += 4
        var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2]
        return ret
      },
      getStr: function (ptr) {
        var ret = UTF8ToString(ptr)
        return ret
      },
      getStreamFromFD: function (fd) {
        var stream = FS.getStream(fd)
        if (!stream) throw new FS.ErrnoError(8)
        return stream
      },
      get64: function (low, high) {
        return low
      }
    }
    function ___syscall10(path) {
      try {
        path = SYSCALLS.getStr(path)
        FS.unlink(path)
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    var ERRNO_CODES = {
      EPERM: 63,
      ENOENT: 44,
      ESRCH: 71,
      EINTR: 27,
      EIO: 29,
      ENXIO: 60,
      E2BIG: 1,
      ENOEXEC: 45,
      EBADF: 8,
      ECHILD: 12,
      EAGAIN: 6,
      EWOULDBLOCK: 6,
      ENOMEM: 48,
      EACCES: 2,
      EFAULT: 21,
      ENOTBLK: 105,
      EBUSY: 10,
      EEXIST: 20,
      EXDEV: 75,
      ENODEV: 43,
      ENOTDIR: 54,
      EISDIR: 31,
      EINVAL: 28,
      ENFILE: 41,
      EMFILE: 33,
      ENOTTY: 59,
      ETXTBSY: 74,
      EFBIG: 22,
      ENOSPC: 51,
      ESPIPE: 70,
      EROFS: 69,
      EMLINK: 34,
      EPIPE: 64,
      EDOM: 18,
      ERANGE: 68,
      ENOMSG: 49,
      EIDRM: 24,
      ECHRNG: 106,
      EL2NSYNC: 156,
      EL3HLT: 107,
      EL3RST: 108,
      ELNRNG: 109,
      EUNATCH: 110,
      ENOCSI: 111,
      EL2HLT: 112,
      EDEADLK: 16,
      ENOLCK: 46,
      EBADE: 113,
      EBADR: 114,
      EXFULL: 115,
      ENOANO: 104,
      EBADRQC: 103,
      EBADSLT: 102,
      EDEADLOCK: 16,
      EBFONT: 101,
      ENOSTR: 100,
      ENODATA: 116,
      ETIME: 117,
      ENOSR: 118,
      ENONET: 119,
      ENOPKG: 120,
      EREMOTE: 121,
      ENOLINK: 47,
      EADV: 122,
      ESRMNT: 123,
      ECOMM: 124,
      EPROTO: 65,
      EMULTIHOP: 36,
      EDOTDOT: 125,
      EBADMSG: 9,
      ENOTUNIQ: 126,
      EBADFD: 127,
      EREMCHG: 128,
      ELIBACC: 129,
      ELIBBAD: 130,
      ELIBSCN: 131,
      ELIBMAX: 132,
      ELIBEXEC: 133,
      ENOSYS: 52,
      ENOTEMPTY: 55,
      ENAMETOOLONG: 37,
      ELOOP: 32,
      EOPNOTSUPP: 138,
      EPFNOSUPPORT: 139,
      ECONNRESET: 15,
      ENOBUFS: 42,
      EAFNOSUPPORT: 5,
      EPROTOTYPE: 67,
      ENOTSOCK: 57,
      ENOPROTOOPT: 50,
      ESHUTDOWN: 140,
      ECONNREFUSED: 14,
      EADDRINUSE: 3,
      ECONNABORTED: 13,
      ENETUNREACH: 40,
      ENETDOWN: 38,
      ETIMEDOUT: 73,
      EHOSTDOWN: 142,
      EHOSTUNREACH: 23,
      EINPROGRESS: 26,
      EALREADY: 7,
      EDESTADDRREQ: 17,
      EMSGSIZE: 35,
      EPROTONOSUPPORT: 66,
      ESOCKTNOSUPPORT: 137,
      EADDRNOTAVAIL: 4,
      ENETRESET: 39,
      EISCONN: 30,
      ENOTCONN: 53,
      ETOOMANYREFS: 141,
      EUSERS: 136,
      EDQUOT: 19,
      ESTALE: 72,
      ENOTSUP: 138,
      ENOMEDIUM: 148,
      EILSEQ: 25,
      EOVERFLOW: 61,
      ECANCELED: 11,
      ENOTRECOVERABLE: 56,
      EOWNERDEAD: 62,
      ESTRPIPE: 135
    }
    var SOCKFS = {
      mount: function (mount) {
        Module['websocket'] =
          Module['websocket'] && 'object' === typeof Module['websocket'] ? Module['websocket'] : {}
        Module['websocket']._callbacks = {}
        Module['websocket']['on'] = function (event, callback) {
          if ('function' === typeof callback) {
            this._callbacks[event] = callback
          }
          return this
        }
        Module['websocket'].emit = function (event, param) {
          if ('function' === typeof this._callbacks[event]) {
            this._callbacks[event].call(this, param)
          }
        }
        return FS.createNode(null, '/', 16384 | 511, 0)
      },
      createSocket: function (family, type, protocol) {
        var streaming = type == 1
        if (protocol) {
          assert(streaming == (protocol == 6))
        }
        var sock = {
          family: family,
          type: type,
          protocol: protocol,
          server: null,
          error: null,
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        }
        var name = SOCKFS.nextname()
        var node = FS.createNode(SOCKFS.root, name, 49152, 0)
        node.sock = sock
        var stream = FS.createStream({
          path: name,
          node: node,
          flags: FS.modeStringToFlags('r+'),
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        })
        sock.stream = stream
        return sock
      },
      getSocket: function (fd) {
        var stream = FS.getStream(fd)
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null
        }
        return stream.node.sock
      },
      stream_ops: {
        poll: function (stream) {
          var sock = stream.node.sock
          return sock.sock_ops.poll(sock)
        },
        ioctl: function (stream, request, varargs) {
          var sock = stream.node.sock
          return sock.sock_ops.ioctl(sock, request, varargs)
        },
        read: function (stream, buffer, offset, length, position) {
          var sock = stream.node.sock
          var msg = sock.sock_ops.recvmsg(sock, length)
          if (!msg) {
            return 0
          }
          buffer.set(msg.buffer, offset)
          return msg.buffer.length
        },
        write: function (stream, buffer, offset, length, position) {
          var sock = stream.node.sock
          return sock.sock_ops.sendmsg(sock, buffer, offset, length)
        },
        close: function (stream) {
          var sock = stream.node.sock
          sock.sock_ops.close(sock)
        }
      },
      nextname: function () {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0
        }
        return 'socket[' + SOCKFS.nextname.current++ + ']'
      },
      websocket_sock_ops: {
        createPeer: function (sock, addr, port) {
          var ws
          if (typeof addr === 'object') {
            ws = addr
            addr = null
            port = null
          }
          if (ws) {
            if (ws._socket) {
              addr = ws._socket.remoteAddress
              port = ws._socket.remotePort
            } else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url)
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port')
              }
              addr = result[1]
              port = parseInt(result[2], 10)
            }
          } else {
            try {
              var runtimeConfig = Module['websocket'] && 'object' === typeof Module['websocket']
              var url = 'ws:#'.replace('#', '//')
              if (runtimeConfig) {
                if ('string' === typeof Module['websocket']['url']) {
                  url = Module['websocket']['url']
                }
              }
              if (url === 'ws://' || url === 'wss://') {
                var parts = addr.split('/')
                url = url + parts[0] + ':' + port + '/' + parts.slice(1).join('/')
              }
              var subProtocols = 'binary'
              if (runtimeConfig) {
                if ('string' === typeof Module['websocket']['subprotocol']) {
                  subProtocols = Module['websocket']['subprotocol']
                }
              }
              var opts = undefined
              if (subProtocols !== 'null') {
                subProtocols = subProtocols.replace(/^ +| +$/g, '').split(/ *, */)
                opts = ENVIRONMENT_IS_NODE ? { protocol: subProtocols.toString() } : subProtocols
              }
              if (runtimeConfig && null === Module['websocket']['subprotocol']) {
                subProtocols = 'null'
                opts = undefined
              }
              var WebSocketConstructor
              {
                WebSocketConstructor = WebSocket
              }
              ws = new WebSocketConstructor(url, opts)
              ws.binaryType = 'arraybuffer'
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH)
            }
          }
          var peer = { addr: addr, port: port, socket: ws, dgram_send_queue: [] }
          SOCKFS.websocket_sock_ops.addPeer(sock, peer)
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer)
          if (sock.type === 2 && typeof sock.sport !== 'undefined') {
            peer.dgram_send_queue.push(
              new Uint8Array([
                255,
                255,
                255,
                255,
                'p'.charCodeAt(0),
                'o'.charCodeAt(0),
                'r'.charCodeAt(0),
                't'.charCodeAt(0),
                (sock.sport & 65280) >> 8,
                sock.sport & 255
              ])
            )
          }
          return peer
        },
        getPeer: function (sock, addr, port) {
          return sock.peers[addr + ':' + port]
        },
        addPeer: function (sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer
        },
        removePeer: function (sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port]
        },
        handlePeerEvents: function (sock, peer) {
          var first = true
          var handleOpen = function () {
            Module['websocket'].emit('open', sock.stream.fd)
            try {
              var queued = peer.dgram_send_queue.shift()
              while (queued) {
                peer.socket.send(queued)
                queued = peer.dgram_send_queue.shift()
              }
            } catch (e) {
              peer.socket.close()
            }
          }
          function handleMessage(data) {
            if (typeof data === 'string') {
              var encoder = new TextEncoder()
              data = encoder.encode(data)
            } else {
              assert(data.byteLength !== undefined)
              if (data.byteLength == 0) {
                return
              } else {
                data = new Uint8Array(data)
              }
            }
            var wasfirst = first
            first = false
            if (
              wasfirst &&
              data.length === 10 &&
              data[0] === 255 &&
              data[1] === 255 &&
              data[2] === 255 &&
              data[3] === 255 &&
              data[4] === 'p'.charCodeAt(0) &&
              data[5] === 'o'.charCodeAt(0) &&
              data[6] === 'r'.charCodeAt(0) &&
              data[7] === 't'.charCodeAt(0)
            ) {
              var newport = (data[8] << 8) | data[9]
              SOCKFS.websocket_sock_ops.removePeer(sock, peer)
              peer.port = newport
              SOCKFS.websocket_sock_ops.addPeer(sock, peer)
              return
            }
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data })
            Module['websocket'].emit('message', sock.stream.fd)
          }
          if (ENVIRONMENT_IS_NODE) {
            peer.socket.on('open', handleOpen)
            peer.socket.on('message', function (data, flags) {
              if (!flags.binary) {
                return
              }
              handleMessage(new Uint8Array(data).buffer)
            })
            peer.socket.on('close', function () {
              Module['websocket'].emit('close', sock.stream.fd)
            })
            peer.socket.on('error', function (error) {
              sock.error = ERRNO_CODES.ECONNREFUSED
              Module['websocket'].emit('error', [
                sock.stream.fd,
                sock.error,
                'ECONNREFUSED: Connection refused'
              ])
            })
          } else {
            peer.socket.onopen = handleOpen
            peer.socket.onclose = function () {
              Module['websocket'].emit('close', sock.stream.fd)
            }
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data)
            }
            peer.socket.onerror = function (error) {
              sock.error = ERRNO_CODES.ECONNREFUSED
              Module['websocket'].emit('error', [
                sock.stream.fd,
                sock.error,
                'ECONNREFUSED: Connection refused'
              ])
            }
          }
        },
        poll: function (sock) {
          if (sock.type === 1 && sock.server) {
            return sock.pending.length ? 64 | 1 : 0
          }
          var mask = 0
          var dest =
            sock.type === 1 ? SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) : null
          if (
            sock.recv_queue.length ||
            !dest ||
            (dest && dest.socket.readyState === dest.socket.CLOSING) ||
            (dest && dest.socket.readyState === dest.socket.CLOSED)
          ) {
            mask |= 64 | 1
          }
          if (!dest || (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4
          }
          if (
            (dest && dest.socket.readyState === dest.socket.CLOSING) ||
            (dest && dest.socket.readyState === dest.socket.CLOSED)
          ) {
            mask |= 16
          }
          return mask
        },
        ioctl: function (sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length
              }
              HEAP32[arg >> 2] = bytes
              return 0
            default:
              return ERRNO_CODES.EINVAL
          }
        },
        close: function (sock) {
          if (sock.server) {
            try {
              sock.server.close()
            } catch (e) {}
            sock.server = null
          }
          var peers = Object.keys(sock.peers)
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]]
            try {
              peer.socket.close()
            } catch (e) {}
            SOCKFS.websocket_sock_ops.removePeer(sock, peer)
          }
          return 0
        },
        bind: function (sock, addr, port) {
          if (typeof sock.saddr !== 'undefined' || typeof sock.sport !== 'undefined') {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
          }
          sock.saddr = addr
          sock.sport = port
          if (sock.type === 2) {
            if (sock.server) {
              sock.server.close()
              sock.server = null
            }
            try {
              sock.sock_ops.listen(sock, 0)
            } catch (e) {
              if (!(e instanceof FS.ErrnoError)) throw e
              if (e.errno !== ERRNO_CODES.EOPNOTSUPP) throw e
            }
          }
        },
        connect: function (sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP)
          }
          if (typeof sock.daddr !== 'undefined' && typeof sock.dport !== 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport)
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(ERRNO_CODES.EALREADY)
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EISCONN)
              }
            }
          }
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port)
          sock.daddr = peer.addr
          sock.dport = peer.port
          throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS)
        },
        listen: function (sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP)
          }
        },
        accept: function (listensock) {
          if (!listensock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
          }
          var newsock = listensock.pending.shift()
          newsock.stream.flags = listensock.stream.flags
          return newsock
        },
        getname: function (sock, peer) {
          var addr, port
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)
            }
            addr = sock.daddr
            port = sock.dport
          } else {
            addr = sock.saddr || 0
            port = sock.sport || 0
          }
          return { addr: addr, port: port }
        },
        sendmsg: function (sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            if (addr === undefined || port === undefined) {
              addr = sock.daddr
              port = sock.dport
            }
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ)
            }
          } else {
            addr = sock.daddr
            port = sock.dport
          }
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port)
          if (sock.type === 1) {
            if (
              !dest ||
              dest.socket.readyState === dest.socket.CLOSING ||
              dest.socket.readyState === dest.socket.CLOSED
            ) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
            }
          }
          if (ArrayBuffer.isView(buffer)) {
            offset += buffer.byteOffset
            buffer = buffer.buffer
          }
          var data
          data = buffer.slice(offset, offset + length)
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              if (
                !dest ||
                dest.socket.readyState === dest.socket.CLOSING ||
                dest.socket.readyState === dest.socket.CLOSED
              ) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port)
              }
              dest.dgram_send_queue.push(data)
              return length
            }
          }
          try {
            dest.socket.send(data)
            return length
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
          }
        },
        recvmsg: function (sock, length) {
          if (sock.type === 1 && sock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)
          }
          var queued = sock.recv_queue.shift()
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport)
              if (!dest) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)
              } else if (
                dest.socket.readyState === dest.socket.CLOSING ||
                dest.socket.readyState === dest.socket.CLOSED
              ) {
                return null
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
              }
            } else {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
            }
          }
          var queuedLength = queued.data.byteLength || queued.data.length
          var queuedOffset = queued.data.byteOffset || 0
          var queuedBuffer = queued.data.buffer || queued.data
          var bytesRead = Math.min(length, queuedLength)
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          }
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining)
            sock.recv_queue.unshift(queued)
          }
          return res
        }
      }
    }
    function __inet_pton4_raw(str) {
      var b = str.split('.')
      for (var i = 0; i < 4; i++) {
        var tmp = Number(b[i])
        if (isNaN(tmp)) return null
        b[i] = tmp
      }
      return (b[0] | (b[1] << 8) | (b[2] << 16) | (b[3] << 24)) >>> 0
    }
    function jstoi_q(str) {
      return parseInt(str, undefined)
    }
    function __inet_pton6_raw(str) {
      var words
      var w, offset, z
      var valid6regx =
        /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i
      var parts = []
      if (!valid6regx.test(str)) {
        return null
      }
      if (str === '::') {
        return [0, 0, 0, 0, 0, 0, 0, 0]
      }
      if (str.indexOf('::') === 0) {
        str = str.replace('::', 'Z:')
      } else {
        str = str.replace('::', ':Z:')
      }
      if (str.indexOf('.') > 0) {
        str = str.replace(new RegExp('[.]', 'g'), ':')
        words = str.split(':')
        words[words.length - 4] =
          jstoi_q(words[words.length - 4]) + jstoi_q(words[words.length - 3]) * 256
        words[words.length - 3] =
          jstoi_q(words[words.length - 2]) + jstoi_q(words[words.length - 1]) * 256
        words = words.slice(0, words.length - 2)
      } else {
        words = str.split(':')
      }
      offset = 0
      z = 0
      for (w = 0; w < words.length; w++) {
        if (typeof words[w] === 'string') {
          if (words[w] === 'Z') {
            for (z = 0; z < 8 - words.length + 1; z++) {
              parts[w + z] = 0
            }
            offset = z - 1
          } else {
            parts[w + offset] = _htons(parseInt(words[w], 16))
          }
        } else {
          parts[w + offset] = words[w]
        }
      }
      return [
        (parts[1] << 16) | parts[0],
        (parts[3] << 16) | parts[2],
        (parts[5] << 16) | parts[4],
        (parts[7] << 16) | parts[6]
      ]
    }
    var DNS = {
      address_map: { id: 1, addrs: {}, names: {} },
      lookup_name: function (name) {
        var res = __inet_pton4_raw(name)
        if (res !== null) {
          return name
        }
        res = __inet_pton6_raw(name)
        if (res !== null) {
          return name
        }
        var addr
        if (DNS.address_map.addrs[name]) {
          addr = DNS.address_map.addrs[name]
        } else {
          var id = DNS.address_map.id++
          assert(id < 65535, 'exceeded max address mappings of 65535')
          addr = '172.29.' + (id & 255) + '.' + (id & 65280)
          DNS.address_map.names[addr] = name
          DNS.address_map.addrs[name] = addr
        }
        return addr
      },
      lookup_addr: function (addr) {
        if (DNS.address_map.names[addr]) {
          return DNS.address_map.names[addr]
        }
        return null
      }
    }
    function __inet_ntop4_raw(addr) {
      return (
        (addr & 255) +
        '.' +
        ((addr >> 8) & 255) +
        '.' +
        ((addr >> 16) & 255) +
        '.' +
        ((addr >> 24) & 255)
      )
    }
    function __inet_ntop6_raw(ints) {
      var str = ''
      var word = 0
      var longest = 0
      var lastzero = 0
      var zstart = 0
      var len = 0
      var i = 0
      var parts = [
        ints[0] & 65535,
        ints[0] >> 16,
        ints[1] & 65535,
        ints[1] >> 16,
        ints[2] & 65535,
        ints[2] >> 16,
        ints[3] & 65535,
        ints[3] >> 16
      ]
      var hasipv4 = true
      var v4part = ''
      for (i = 0; i < 5; i++) {
        if (parts[i] !== 0) {
          hasipv4 = false
          break
        }
      }
      if (hasipv4) {
        v4part = __inet_ntop4_raw(parts[6] | (parts[7] << 16))
        if (parts[5] === -1) {
          str = '::ffff:'
          str += v4part
          return str
        }
        if (parts[5] === 0) {
          str = '::'
          if (v4part === '0.0.0.0') v4part = ''
          if (v4part === '0.0.0.1') v4part = '1'
          str += v4part
          return str
        }
      }
      for (word = 0; word < 8; word++) {
        if (parts[word] === 0) {
          if (word - lastzero > 1) {
            len = 0
          }
          lastzero = word
          len++
        }
        if (len > longest) {
          longest = len
          zstart = word - longest + 1
        }
      }
      for (word = 0; word < 8; word++) {
        if (longest > 1) {
          if (parts[word] === 0 && word >= zstart && word < zstart + longest) {
            if (word === zstart) {
              str += ':'
              if (zstart === 0) str += ':'
            }
            continue
          }
        }
        str += Number(_ntohs(parts[word] & 65535)).toString(16)
        str += word < 7 ? ':' : ''
      }
      return str
    }
    function __read_sockaddr(sa, salen) {
      var family = HEAP16[sa >> 1]
      var port = _ntohs(HEAPU16[(sa + 2) >> 1])
      var addr
      switch (family) {
        case 2:
          if (salen !== 16) {
            return { errno: 28 }
          }
          addr = HEAP32[(sa + 4) >> 2]
          addr = __inet_ntop4_raw(addr)
          break
        case 10:
          if (salen !== 28) {
            return { errno: 28 }
          }
          addr = [
            HEAP32[(sa + 8) >> 2],
            HEAP32[(sa + 12) >> 2],
            HEAP32[(sa + 16) >> 2],
            HEAP32[(sa + 20) >> 2]
          ]
          addr = __inet_ntop6_raw(addr)
          break
        default:
          return { errno: 5 }
      }
      return { family: family, addr: addr, port: port }
    }
    function __write_sockaddr(sa, family, addr, port) {
      switch (family) {
        case 2:
          addr = __inet_pton4_raw(addr)
          HEAP16[sa >> 1] = family
          HEAP32[(sa + 4) >> 2] = addr
          HEAP16[(sa + 2) >> 1] = _htons(port)
          break
        case 10:
          addr = __inet_pton6_raw(addr)
          HEAP32[sa >> 2] = family
          HEAP32[(sa + 8) >> 2] = addr[0]
          HEAP32[(sa + 12) >> 2] = addr[1]
          HEAP32[(sa + 16) >> 2] = addr[2]
          HEAP32[(sa + 20) >> 2] = addr[3]
          HEAP16[(sa + 2) >> 1] = _htons(port)
          HEAP32[(sa + 4) >> 2] = 0
          HEAP32[(sa + 24) >> 2] = 0
          break
        default:
          return { errno: 5 }
      }
      return {}
    }
    function ___syscall102(call, socketvararg) {
      try {
        SYSCALLS.varargs = socketvararg
        var getSocketFromFD = function () {
          var socket = SOCKFS.getSocket(SYSCALLS.get())
          if (!socket) throw new FS.ErrnoError(8)
          return socket
        }
        var getSocketAddress = function (allowNull) {
          var addrp = SYSCALLS.get(),
            addrlen = SYSCALLS.get()
          if (allowNull && addrp === 0) return null
          var info = __read_sockaddr(addrp, addrlen)
          if (info.errno) throw new FS.ErrnoError(info.errno)
          info.addr = DNS.lookup_addr(info.addr) || info.addr
          return info
        }
        switch (call) {
          case 1: {
            var domain = SYSCALLS.get(),
              type = SYSCALLS.get(),
              protocol = SYSCALLS.get()
            var sock = SOCKFS.createSocket(domain, type, protocol)
            return sock.stream.fd
          }
          case 2: {
            var sock = getSocketFromFD(),
              info = getSocketAddress()
            sock.sock_ops.bind(sock, info.addr, info.port)
            return 0
          }
          case 3: {
            var sock = getSocketFromFD(),
              info = getSocketAddress()
            sock.sock_ops.connect(sock, info.addr, info.port)
            return 0
          }
          case 4: {
            var sock = getSocketFromFD(),
              backlog = SYSCALLS.get()
            sock.sock_ops.listen(sock, backlog)
            return 0
          }
          case 5: {
            var sock = getSocketFromFD(),
              addr = SYSCALLS.get(),
              addrlen = SYSCALLS.get()
            var newsock = sock.sock_ops.accept(sock)
            if (addr) {
              var res = __write_sockaddr(
                addr,
                newsock.family,
                DNS.lookup_name(newsock.daddr),
                newsock.dport
              )
            }
            return newsock.stream.fd
          }
          case 6: {
            var sock = getSocketFromFD(),
              addr = SYSCALLS.get(),
              addrlen = SYSCALLS.get()
            var res = __write_sockaddr(
              addr,
              sock.family,
              DNS.lookup_name(sock.saddr || '0.0.0.0'),
              sock.sport
            )
            return 0
          }
          case 7: {
            var sock = getSocketFromFD(),
              addr = SYSCALLS.get(),
              addrlen = SYSCALLS.get()
            if (!sock.daddr) {
              return -53
            }
            var res = __write_sockaddr(addr, sock.family, DNS.lookup_name(sock.daddr), sock.dport)
            return 0
          }
          case 11: {
            var sock = getSocketFromFD(),
              message = SYSCALLS.get(),
              length = SYSCALLS.get(),
              flags = SYSCALLS.get(),
              dest = getSocketAddress(true)
            if (!dest) {
              return FS.write(sock.stream, HEAP8, message, length)
            } else {
              return sock.sock_ops.sendmsg(sock, HEAP8, message, length, dest.addr, dest.port)
            }
          }
          case 12: {
            var sock = getSocketFromFD(),
              buf = SYSCALLS.get(),
              len = SYSCALLS.get(),
              flags = SYSCALLS.get(),
              addr = SYSCALLS.get(),
              addrlen = SYSCALLS.get()
            var msg = sock.sock_ops.recvmsg(sock, len)
            if (!msg) return 0
            if (addr) {
              var res = __write_sockaddr(addr, sock.family, DNS.lookup_name(msg.addr), msg.port)
            }
            HEAPU8.set(msg.buffer, buf)
            return msg.buffer.byteLength
          }
          case 14: {
            return -50
          }
          case 15: {
            var sock = getSocketFromFD(),
              level = SYSCALLS.get(),
              optname = SYSCALLS.get(),
              optval = SYSCALLS.get(),
              optlen = SYSCALLS.get()
            if (level === 1) {
              if (optname === 4) {
                HEAP32[optval >> 2] = sock.error
                HEAP32[optlen >> 2] = 4
                sock.error = null
                return 0
              }
            }
            return -50
          }
          case 16: {
            var sock = getSocketFromFD(),
              message = SYSCALLS.get(),
              flags = SYSCALLS.get()
            var iov = HEAP32[(message + 8) >> 2]
            var num = HEAP32[(message + 12) >> 2]
            var addr, port
            var name = HEAP32[message >> 2]
            var namelen = HEAP32[(message + 4) >> 2]
            if (name) {
              var info = __read_sockaddr(name, namelen)
              if (info.errno) return -info.errno
              port = info.port
              addr = DNS.lookup_addr(info.addr) || info.addr
            }
            var total = 0
            for (var i = 0; i < num; i++) {
              total += HEAP32[(iov + (8 * i + 4)) >> 2]
            }
            var view = new Uint8Array(total)
            var offset = 0
            for (var i = 0; i < num; i++) {
              var iovbase = HEAP32[(iov + (8 * i + 0)) >> 2]
              var iovlen = HEAP32[(iov + (8 * i + 4)) >> 2]
              for (var j = 0; j < iovlen; j++) {
                view[offset++] = HEAP8[(iovbase + j) >> 0]
              }
            }
            return sock.sock_ops.sendmsg(sock, view, 0, total, addr, port)
          }
          case 17: {
            var sock = getSocketFromFD(),
              message = SYSCALLS.get(),
              flags = SYSCALLS.get()
            var iov = HEAP32[(message + 8) >> 2]
            var num = HEAP32[(message + 12) >> 2]
            var total = 0
            for (var i = 0; i < num; i++) {
              total += HEAP32[(iov + (8 * i + 4)) >> 2]
            }
            var msg = sock.sock_ops.recvmsg(sock, total)
            if (!msg) return 0
            var name = HEAP32[message >> 2]
            if (name) {
              var res = __write_sockaddr(name, sock.family, DNS.lookup_name(msg.addr), msg.port)
            }
            var bytesRead = 0
            var bytesRemaining = msg.buffer.byteLength
            for (var i = 0; bytesRemaining > 0 && i < num; i++) {
              var iovbase = HEAP32[(iov + (8 * i + 0)) >> 2]
              var iovlen = HEAP32[(iov + (8 * i + 4)) >> 2]
              if (!iovlen) {
                continue
              }
              var length = Math.min(iovlen, bytesRemaining)
              var buf = msg.buffer.subarray(bytesRead, bytesRead + length)
              HEAPU8.set(buf, iovbase + bytesRead)
              bytesRead += length
              bytesRemaining -= length
            }
            return bytesRead
          }
          default: {
            return -52
          }
        }
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall12(path) {
      try {
        path = SYSCALLS.getStr(path)
        FS.chdir(path)
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall122(buf) {
      try {
        if (!buf) return -21
        var layout = {
          __size__: 390,
          sysname: 0,
          nodename: 65,
          release: 130,
          version: 195,
          machine: 260,
          domainname: 325
        }
        var copyString = function (element, value) {
          var offset = layout[element]
          writeAsciiToMemory(value, buf + offset)
        }
        copyString('sysname', 'Emscripten')
        copyString('nodename', 'emscripten')
        copyString('release', '1.0')
        copyString('version', '#1')
        copyString('machine', 'x86-JS')
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall142(nfds, readfds, writefds, exceptfds, timeout) {
      try {
        var total = 0
        var srcReadLow = readfds ? HEAP32[readfds >> 2] : 0,
          srcReadHigh = readfds ? HEAP32[(readfds + 4) >> 2] : 0
        var srcWriteLow = writefds ? HEAP32[writefds >> 2] : 0,
          srcWriteHigh = writefds ? HEAP32[(writefds + 4) >> 2] : 0
        var srcExceptLow = exceptfds ? HEAP32[exceptfds >> 2] : 0,
          srcExceptHigh = exceptfds ? HEAP32[(exceptfds + 4) >> 2] : 0
        var dstReadLow = 0,
          dstReadHigh = 0
        var dstWriteLow = 0,
          dstWriteHigh = 0
        var dstExceptLow = 0,
          dstExceptHigh = 0
        var allLow =
          (readfds ? HEAP32[readfds >> 2] : 0) |
          (writefds ? HEAP32[writefds >> 2] : 0) |
          (exceptfds ? HEAP32[exceptfds >> 2] : 0)
        var allHigh =
          (readfds ? HEAP32[(readfds + 4) >> 2] : 0) |
          (writefds ? HEAP32[(writefds + 4) >> 2] : 0) |
          (exceptfds ? HEAP32[(exceptfds + 4) >> 2] : 0)
        var check = function (fd, low, high, val) {
          return fd < 32 ? low & val : high & val
        }
        for (var fd = 0; fd < nfds; fd++) {
          var mask = 1 << fd % 32
          if (!check(fd, allLow, allHigh, mask)) {
            continue
          }
          var stream = FS.getStream(fd)
          if (!stream) throw new FS.ErrnoError(8)
          var flags = SYSCALLS.DEFAULT_POLLMASK
          if (stream.stream_ops.poll) {
            flags = stream.stream_ops.poll(stream)
          }
          if (flags & 1 && check(fd, srcReadLow, srcReadHigh, mask)) {
            fd < 32 ? (dstReadLow = dstReadLow | mask) : (dstReadHigh = dstReadHigh | mask)
            total++
          }
          if (flags & 4 && check(fd, srcWriteLow, srcWriteHigh, mask)) {
            fd < 32 ? (dstWriteLow = dstWriteLow | mask) : (dstWriteHigh = dstWriteHigh | mask)
            total++
          }
          if (flags & 2 && check(fd, srcExceptLow, srcExceptHigh, mask)) {
            fd < 32 ? (dstExceptLow = dstExceptLow | mask) : (dstExceptHigh = dstExceptHigh | mask)
            total++
          }
        }
        if (readfds) {
          HEAP32[readfds >> 2] = dstReadLow
          HEAP32[(readfds + 4) >> 2] = dstReadHigh
        }
        if (writefds) {
          HEAP32[writefds >> 2] = dstWriteLow
          HEAP32[(writefds + 4) >> 2] = dstWriteHigh
        }
        if (exceptfds) {
          HEAP32[exceptfds >> 2] = dstExceptLow
          HEAP32[(exceptfds + 4) >> 2] = dstExceptHigh
        }
        return total
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall144(addr, len, flags) {
      try {
        var info = SYSCALLS.mappings[addr]
        if (!info) return 0
        SYSCALLS.doMsync(addr, FS.getStream(info.fd), len, info.flags, 0)
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall15(path, mode) {
      try {
        path = SYSCALLS.getStr(path)
        FS.chmod(path, mode)
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall168(fds, nfds, timeout) {
      try {
        var nonzero = 0
        for (var i = 0; i < nfds; i++) {
          var pollfd = fds + 8 * i
          var fd = HEAP32[pollfd >> 2]
          var events = HEAP16[(pollfd + 4) >> 1]
          var mask = 32
          var stream = FS.getStream(fd)
          if (stream) {
            mask = SYSCALLS.DEFAULT_POLLMASK
            if (stream.stream_ops.poll) {
              mask = stream.stream_ops.poll(stream)
            }
          }
          mask &= events | 8 | 16
          if (mask) nonzero++
          HEAP16[(pollfd + 6) >> 1] = mask
        }
        return nonzero
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall183(buf, size) {
      try {
        if (size === 0) return -28
        var cwd = FS.cwd()
        var cwdLengthInBytes = lengthBytesUTF8(cwd)
        if (size < cwdLengthInBytes + 1) return -68
        stringToUTF8(cwd, buf, size)
        return buf
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function _memset(ptr, value, num) {
      ptr = ptr | 0
      value = value | 0
      num = num | 0
      var end = 0,
        aligned_end = 0,
        block_aligned_end = 0,
        value4 = 0
      end = (ptr + num) | 0
      value = value & 255
      if ((num | 0) >= 67) {
        while ((ptr & 3) != 0) {
          HEAP8[ptr >> 0] = value
          ptr = (ptr + 1) | 0
        }
        aligned_end = (end & -4) | 0
        value4 = value | (value << 8) | (value << 16) | (value << 24)
        block_aligned_end = (aligned_end - 64) | 0
        while ((ptr | 0) <= (block_aligned_end | 0)) {
          HEAP32[ptr >> 2] = value4
          HEAP32[(ptr + 4) >> 2] = value4
          HEAP32[(ptr + 8) >> 2] = value4
          HEAP32[(ptr + 12) >> 2] = value4
          HEAP32[(ptr + 16) >> 2] = value4
          HEAP32[(ptr + 20) >> 2] = value4
          HEAP32[(ptr + 24) >> 2] = value4
          HEAP32[(ptr + 28) >> 2] = value4
          HEAP32[(ptr + 32) >> 2] = value4
          HEAP32[(ptr + 36) >> 2] = value4
          HEAP32[(ptr + 40) >> 2] = value4
          HEAP32[(ptr + 44) >> 2] = value4
          HEAP32[(ptr + 48) >> 2] = value4
          HEAP32[(ptr + 52) >> 2] = value4
          HEAP32[(ptr + 56) >> 2] = value4
          HEAP32[(ptr + 60) >> 2] = value4
          ptr = (ptr + 64) | 0
        }
        while ((ptr | 0) < (aligned_end | 0)) {
          HEAP32[ptr >> 2] = value4
          ptr = (ptr + 4) | 0
        }
      }
      while ((ptr | 0) < (end | 0)) {
        HEAP8[ptr >> 0] = value
        ptr = (ptr + 1) | 0
      }
      return (end - num) | 0
    }
    function syscallMmap2(addr, len, prot, flags, fd, off) {
      off <<= 12
      var ptr
      var allocated = false
      if ((flags & 16) !== 0 && addr % 16384 !== 0) {
        return -28
      }
      if ((flags & 32) !== 0) {
        ptr = _memalign(16384, len)
        if (!ptr) return -48
        _memset(ptr, 0, len)
        allocated = true
      } else {
        var info = FS.getStream(fd)
        if (!info) return -8
        var res = FS.mmap(info, HEAPU8, addr, len, off, prot, flags)
        ptr = res.ptr
        allocated = res.allocated
      }
      SYSCALLS.mappings[ptr] = {
        malloc: ptr,
        len: len,
        allocated: allocated,
        fd: fd,
        flags: flags,
        offset: off
      }
      return ptr
    }
    function ___syscall192(addr, len, prot, flags, fd, off) {
      try {
        return syscallMmap2(addr, len, prot, flags, fd, off)
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall194(fd, zero, low, high) {
      try {
        var length = SYSCALLS.get64(low, high)
        FS.ftruncate(fd, length)
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall195(path, buf) {
      try {
        path = SYSCALLS.getStr(path)
        return SYSCALLS.doStat(FS.stat, path, buf)
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall196(path, buf) {
      try {
        path = SYSCALLS.getStr(path)
        return SYSCALLS.doStat(FS.lstat, path, buf)
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall197(fd, buf) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        return SYSCALLS.doStat(FS.stat, stream.path, buf)
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall202() {
      return 0
    }
    function ___syscall199() {
      return ___syscall202()
    }
    function ___syscall20() {
      return 42
    }
    function ___syscall201() {
      return ___syscall202()
    }
    function ___syscall211(ruid, euid, suid) {
      HEAP32[ruid >> 2] = 0
      HEAP32[euid >> 2] = 0
      HEAP32[suid >> 2] = 0
      return 0
    }
    function ___syscall209(a0, a1, a2) {
      return ___syscall211(a0, a1, a2)
    }
    function ___syscall220(fd, dirp, count) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        if (!stream.getdents) {
          stream.getdents = FS.readdir(stream.path)
        }
        var struct_size = 280
        var pos = 0
        var off = FS.llseek(stream, 0, 1)
        var idx = Math.floor(off / struct_size)
        while (idx < stream.getdents.length && pos + struct_size <= count) {
          var id
          var type
          var name = stream.getdents[idx]
          if (name[0] === '.') {
            id = 1
            type = 4
          } else {
            var child = FS.lookupNode(stream.node, name)
            id = child.id
            type = FS.isChrdev(child.mode)
              ? 2
              : FS.isDir(child.mode)
              ? 4
              : FS.isLink(child.mode)
              ? 10
              : 8
          }
          ;(tempI64 = [
            id >>> 0,
            ((tempDouble = id),
            +Math_abs(tempDouble) >= 1
              ? tempDouble > 0
                ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
                : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
              : 0)
          ]),
            (HEAP32[(dirp + pos) >> 2] = tempI64[0]),
            (HEAP32[(dirp + pos + 4) >> 2] = tempI64[1])
          ;(tempI64 = [
            ((idx + 1) * struct_size) >>> 0,
            ((tempDouble = (idx + 1) * struct_size),
            +Math_abs(tempDouble) >= 1
              ? tempDouble > 0
                ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
                : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
              : 0)
          ]),
            (HEAP32[(dirp + pos + 8) >> 2] = tempI64[0]),
            (HEAP32[(dirp + pos + 12) >> 2] = tempI64[1])
          HEAP16[(dirp + pos + 16) >> 1] = 280
          HEAP8[(dirp + pos + 18) >> 0] = type
          stringToUTF8(name, dirp + pos + 19, 256)
          pos += struct_size
          idx += 1
        }
        FS.llseek(stream, idx * struct_size, 0)
        return pos
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall221(fd, cmd, varargs) {
      SYSCALLS.varargs = varargs
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        switch (cmd) {
          case 0: {
            var arg = SYSCALLS.get()
            if (arg < 0) {
              return -28
            }
            var newStream
            newStream = FS.open(stream.path, stream.flags, 0, arg)
            return newStream.fd
          }
          case 1:
          case 2:
            return 0
          case 3:
            return stream.flags
          case 4: {
            var arg = SYSCALLS.get()
            stream.flags |= arg
            return 0
          }
          case 12: {
            var arg = SYSCALLS.get()
            var offset = 0
            HEAP16[(arg + offset) >> 1] = 2
            return 0
          }
          case 13:
          case 14:
            return 0
          case 16:
          case 8:
            return -28
          case 9:
            ___setErrNo(28)
            return -1
          default: {
            return -28
          }
        }
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall268(path, size, buf) {
      try {
        path = SYSCALLS.getStr(path)
        HEAP32[(buf + 4) >> 2] = 4096
        HEAP32[(buf + 40) >> 2] = 4096
        HEAP32[(buf + 8) >> 2] = 1e6
        HEAP32[(buf + 12) >> 2] = 5e5
        HEAP32[(buf + 16) >> 2] = 5e5
        HEAP32[(buf + 20) >> 2] = FS.nextInode
        HEAP32[(buf + 24) >> 2] = 1e6
        HEAP32[(buf + 28) >> 2] = 42
        HEAP32[(buf + 44) >> 2] = 2
        HEAP32[(buf + 36) >> 2] = 255
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall272(fd, offset, len, advice) {
      return 0
    }
    function ___syscall3(fd, buf, count) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        return FS.read(stream, HEAP8, buf, count)
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall320(dirfd, path, times, flags) {
      try {
        path = SYSCALLS.getStr(path)
        path = SYSCALLS.calculateAt(dirfd, path)
        var seconds = HEAP32[times >> 2]
        var nanoseconds = HEAP32[(times + 4) >> 2]
        var atime = seconds * 1e3 + nanoseconds / (1e3 * 1e3)
        times += 8
        seconds = HEAP32[times >> 2]
        nanoseconds = HEAP32[(times + 4) >> 2]
        var mtime = seconds * 1e3 + nanoseconds / (1e3 * 1e3)
        FS.utime(path, atime, mtime)
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall33(path, amode) {
      try {
        path = SYSCALLS.getStr(path)
        return SYSCALLS.doAccess(path, amode)
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall38(old_path, new_path) {
      try {
        old_path = SYSCALLS.getStr(old_path)
        new_path = SYSCALLS.getStr(new_path)
        FS.rename(old_path, new_path)
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall39(path, mode) {
      try {
        path = SYSCALLS.getStr(path)
        return SYSCALLS.doMkdir(path, mode)
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall40(path) {
      try {
        path = SYSCALLS.getStr(path)
        FS.rmdir(path)
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall41(fd) {
      try {
        var old = SYSCALLS.getStreamFromFD(fd)
        return FS.open(old.path, old.flags, 0).fd
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    var PIPEFS = {
      BUCKET_BUFFER_SIZE: 8192,
      mount: function (mount) {
        return FS.createNode(null, '/', 16384 | 511, 0)
      },
      createPipe: function () {
        var pipe = { buckets: [] }
        pipe.buckets.push({
          buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
          offset: 0,
          roffset: 0
        })
        var rName = PIPEFS.nextname()
        var wName = PIPEFS.nextname()
        var rNode = FS.createNode(PIPEFS.root, rName, 4096, 0)
        var wNode = FS.createNode(PIPEFS.root, wName, 4096, 0)
        rNode.pipe = pipe
        wNode.pipe = pipe
        var readableStream = FS.createStream({
          path: rName,
          node: rNode,
          flags: FS.modeStringToFlags('r'),
          seekable: false,
          stream_ops: PIPEFS.stream_ops
        })
        rNode.stream = readableStream
        var writableStream = FS.createStream({
          path: wName,
          node: wNode,
          flags: FS.modeStringToFlags('w'),
          seekable: false,
          stream_ops: PIPEFS.stream_ops
        })
        wNode.stream = writableStream
        return { readable_fd: readableStream.fd, writable_fd: writableStream.fd }
      },
      stream_ops: {
        poll: function (stream) {
          var pipe = stream.node.pipe
          if ((stream.flags & 2097155) === 1) {
            return 256 | 4
          } else {
            if (pipe.buckets.length > 0) {
              for (var i = 0; i < pipe.buckets.length; i++) {
                var bucket = pipe.buckets[i]
                if (bucket.offset - bucket.roffset > 0) {
                  return 64 | 1
                }
              }
            }
          }
          return 0
        },
        ioctl: function (stream, request, varargs) {
          return ERRNO_CODES.EINVAL
        },
        fsync: function (stream) {
          return ERRNO_CODES.EINVAL
        },
        read: function (stream, buffer, offset, length, position) {
          var pipe = stream.node.pipe
          var currentLength = 0
          for (var i = 0; i < pipe.buckets.length; i++) {
            var bucket = pipe.buckets[i]
            currentLength += bucket.offset - bucket.roffset
          }
          assert(buffer instanceof ArrayBuffer || ArrayBuffer.isView(buffer))
          var data = buffer.subarray(offset, offset + length)
          if (length <= 0) {
            return 0
          }
          if (currentLength == 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
          }
          var toRead = Math.min(currentLength, length)
          var totalRead = toRead
          var toRemove = 0
          for (var i = 0; i < pipe.buckets.length; i++) {
            var currBucket = pipe.buckets[i]
            var bucketSize = currBucket.offset - currBucket.roffset
            if (toRead <= bucketSize) {
              var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset)
              if (toRead < bucketSize) {
                tmpSlice = tmpSlice.subarray(0, toRead)
                currBucket.roffset += toRead
              } else {
                toRemove++
              }
              data.set(tmpSlice)
              break
            } else {
              var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset)
              data.set(tmpSlice)
              data = data.subarray(tmpSlice.byteLength)
              toRead -= tmpSlice.byteLength
              toRemove++
            }
          }
          if (toRemove && toRemove == pipe.buckets.length) {
            toRemove--
            pipe.buckets[toRemove].offset = 0
            pipe.buckets[toRemove].roffset = 0
          }
          pipe.buckets.splice(0, toRemove)
          return totalRead
        },
        write: function (stream, buffer, offset, length, position) {
          var pipe = stream.node.pipe
          assert(buffer instanceof ArrayBuffer || ArrayBuffer.isView(buffer))
          var data = buffer.subarray(offset, offset + length)
          var dataLen = data.byteLength
          if (dataLen <= 0) {
            return 0
          }
          var currBucket = null
          if (pipe.buckets.length == 0) {
            currBucket = {
              buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
              offset: 0,
              roffset: 0
            }
            pipe.buckets.push(currBucket)
          } else {
            currBucket = pipe.buckets[pipe.buckets.length - 1]
          }
          assert(currBucket.offset <= PIPEFS.BUCKET_BUFFER_SIZE)
          var freeBytesInCurrBuffer = PIPEFS.BUCKET_BUFFER_SIZE - currBucket.offset
          if (freeBytesInCurrBuffer >= dataLen) {
            currBucket.buffer.set(data, currBucket.offset)
            currBucket.offset += dataLen
            return dataLen
          } else if (freeBytesInCurrBuffer > 0) {
            currBucket.buffer.set(data.subarray(0, freeBytesInCurrBuffer), currBucket.offset)
            currBucket.offset += freeBytesInCurrBuffer
            data = data.subarray(freeBytesInCurrBuffer, data.byteLength)
          }
          var numBuckets = (data.byteLength / PIPEFS.BUCKET_BUFFER_SIZE) | 0
          var remElements = data.byteLength % PIPEFS.BUCKET_BUFFER_SIZE
          for (var i = 0; i < numBuckets; i++) {
            var newBucket = {
              buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
              offset: PIPEFS.BUCKET_BUFFER_SIZE,
              roffset: 0
            }
            pipe.buckets.push(newBucket)
            newBucket.buffer.set(data.subarray(0, PIPEFS.BUCKET_BUFFER_SIZE))
            data = data.subarray(PIPEFS.BUCKET_BUFFER_SIZE, data.byteLength)
          }
          if (remElements > 0) {
            var newBucket = {
              buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
              offset: data.byteLength,
              roffset: 0
            }
            pipe.buckets.push(newBucket)
            newBucket.buffer.set(data)
          }
          return dataLen
        },
        close: function (stream) {
          var pipe = stream.node.pipe
          pipe.buckets = null
        }
      },
      nextname: function () {
        if (!PIPEFS.nextname.current) {
          PIPEFS.nextname.current = 0
        }
        return 'pipe[' + PIPEFS.nextname.current++ + ']'
      }
    }
    function ___syscall42(fdPtr) {
      try {
        if (fdPtr == 0) {
          throw new FS.ErrnoError(21)
        }
        var res = PIPEFS.createPipe()
        HEAP32[fdPtr >> 2] = res.readable_fd
        HEAP32[(fdPtr + 4) >> 2] = res.writable_fd
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall5(path, flags, varargs) {
      SYSCALLS.varargs = varargs
      try {
        var pathname = SYSCALLS.getStr(path)
        var mode = SYSCALLS.get()
        var stream = FS.open(pathname, flags, mode)
        return stream.fd
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall54(fd, op, varargs) {
      SYSCALLS.varargs = varargs
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        switch (op) {
          case 21509:
          case 21505: {
            if (!stream.tty) return -59
            return 0
          }
          case 21510:
          case 21511:
          case 21512:
          case 21506:
          case 21507:
          case 21508: {
            if (!stream.tty) return -59
            return 0
          }
          case 21519: {
            if (!stream.tty) return -59
            var argp = SYSCALLS.get()
            HEAP32[argp >> 2] = 0
            return 0
          }
          case 21520: {
            if (!stream.tty) return -59
            return -28
          }
          case 21531: {
            var argp = SYSCALLS.get()
            return FS.ioctl(stream, op, argp)
          }
          case 21523: {
            if (!stream.tty) return -59
            return 0
          }
          case 21524: {
            if (!stream.tty) return -59
            return 0
          }
          default:
            abort('bad ioctl syscall ' + op)
        }
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall63(oldfd, suggestFD) {
      try {
        var old = SYSCALLS.getStreamFromFD(oldfd)
        if (old.fd === suggestFD) return suggestFD
        return SYSCALLS.doDup(old.path, old.flags, suggestFD)
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall77(who, usage) {
      try {
        _memset(usage, 0, 136)
        HEAP32[usage >> 2] = 1
        HEAP32[(usage + 4) >> 2] = 2
        HEAP32[(usage + 8) >> 2] = 3
        HEAP32[(usage + 12) >> 2] = 4
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall83(target, linkpath) {
      try {
        target = SYSCALLS.getStr(target)
        linkpath = SYSCALLS.getStr(linkpath)
        FS.symlink(target, linkpath)
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall85(path, buf, bufsize) {
      try {
        path = SYSCALLS.getStr(path)
        return SYSCALLS.doReadlink(path, buf, bufsize)
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall9(oldpath, newpath) {
      return -34
    }
    function syscallMunmap(addr, len) {
      if (addr === -1 || len === 0) {
        return -28
      }
      var info = SYSCALLS.mappings[addr]
      if (!info) return 0
      if (len === info.len) {
        var stream = FS.getStream(info.fd)
        SYSCALLS.doMsync(addr, stream, len, info.flags, info.offset)
        FS.munmap(stream)
        SYSCALLS.mappings[addr] = null
        if (info.allocated) {
          _free(info.malloc)
        }
      }
      return 0
    }
    function ___syscall91(addr, len) {
      try {
        return syscallMunmap(addr, len)
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall94(fd, mode) {
      try {
        FS.fchmod(fd, mode)
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return -e.errno
      }
    }
    function ___syscall96() {
      return 0
    }
    function ___syscall97() {
      return -63
    }
    function _exit(status) {
      exit(status)
    }
    function _abort() {
      abort()
    }
    function _emscripten_get_now_res() {
      return 1e3
    }
    function _clock_getres(clk_id, res) {
      var nsec
      if (clk_id === 0) {
        nsec = 1e3 * 1e3
      } else if (clk_id === 1 && _emscripten_get_now_is_monotonic) {
        nsec = _emscripten_get_now_res()
      } else {
        ___setErrNo(28)
        return -1
      }
      HEAP32[res >> 2] = (nsec / 1e9) | 0
      HEAP32[(res + 4) >> 2] = nsec
      return 0
    }
    function _dlclose(handle) {
      abort(
        "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
      )
    }
    function _dlerror() {
      abort(
        "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
      )
    }
    function _dlopen(filename, flag) {
      abort(
        "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
      )
    }
    function _dlsym(handle, symbol) {
      abort(
        "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
      )
    }
    function _emscripten_set_main_loop_timing(mode, value) {
      Browser.mainLoop.timingMode = mode
      Browser.mainLoop.timingValue = value
      if (!Browser.mainLoop.func) {
        return 1
      }
      if (mode == 0) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
          var timeUntilNextTick =
            Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0
          setTimeout(Browser.mainLoop.runner, timeUntilNextTick)
        }
        Browser.mainLoop.method = 'timeout'
      } else if (mode == 1) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner)
        }
        Browser.mainLoop.method = 'rAF'
      } else if (mode == 2) {
        if (typeof setImmediate === 'undefined') {
          var setImmediates = []
          var emscriptenMainLoopMessageId = 'setimmediate'
          var Browser_setImmediate_messageHandler = function (event) {
            if (
              event.data === emscriptenMainLoopMessageId ||
              event.data.target === emscriptenMainLoopMessageId
            ) {
              event.stopPropagation()
              setImmediates.shift()()
            }
          }
          addEventListener('message', Browser_setImmediate_messageHandler, true)
          setImmediate = function Browser_emulated_setImmediate(func) {
            setImmediates.push(func)
            if (ENVIRONMENT_IS_WORKER) {
              if (Module['setImmediates'] === undefined) Module['setImmediates'] = []
              Module['setImmediates'].push(func)
              postMessage({ target: emscriptenMainLoopMessageId })
            } else postMessage(emscriptenMainLoopMessageId, '*')
          }
        }
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
          setImmediate(Browser.mainLoop.runner)
        }
        Browser.mainLoop.method = 'immediate'
      }
      return 0
    }
    function _emscripten_webgl_do_commit_frame() {
      if (!GL.currentContext || !GL.currentContext.GLctx) {
        return -3
      }
      if (GL.currentContext.defaultFbo) {
        GL.blitOffscreenFramebuffer(GL.currentContext)
        return 0
      }
      if (!GL.currentContext.attributes.explicitSwapControl) {
        return -3
      }
      return 0
    }
    function _emscripten_webgl_commit_frame() {
      return _emscripten_webgl_do_commit_frame()
    }
    function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg, noSetTiming) {
      noExitRuntime = true
      assert(
        !Browser.mainLoop.func,
        'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.'
      )
      Browser.mainLoop.func = func
      Browser.mainLoop.arg = arg
      var browserIterationFunc
      if (typeof arg !== 'undefined') {
        browserIterationFunc = function () {
          Module['dynCall_vi'](func, arg)
        }
      } else {
        browserIterationFunc = function () {
          Module['dynCall_v'](func)
        }
      }
      var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now()
          var blocker = Browser.mainLoop.queue.shift()
          blocker.func(blocker.arg)
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers
            var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining)
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next
            } else {
              next = next + 0.5
              Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9
            }
          }
          console.log(
            'main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + ' ms'
          )
          Browser.mainLoop.updateStatus()
          if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return
          setTimeout(Browser.mainLoop.runner, 0)
          return
        }
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return
        Browser.mainLoop.currentFrameNumber = (Browser.mainLoop.currentFrameNumber + 1) | 0
        if (
          Browser.mainLoop.timingMode == 1 &&
          Browser.mainLoop.timingValue > 1 &&
          Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0
        ) {
          Browser.mainLoop.scheduler()
          return
        } else if (Browser.mainLoop.timingMode == 0) {
          Browser.mainLoop.tickStartTime = _emscripten_get_now()
        }
        Browser.mainLoop.runIter(browserIterationFunc)
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return
        if (typeof SDL === 'object' && SDL.audio && SDL.audio.queueNewAudioData)
          SDL.audio.queueNewAudioData()
        Browser.mainLoop.scheduler()
      }
      if (!noSetTiming) {
        if (fps && fps > 0) _emscripten_set_main_loop_timing(0, 1e3 / fps)
        else _emscripten_set_main_loop_timing(1, 1)
        Browser.mainLoop.scheduler()
      }
      if (simulateInfiniteLoop) {
        throw 'unwind'
      }
    }
    var Browser = {
      mainLoop: {
        scheduler: null,
        method: '',
        currentlyRunningMainloop: 0,
        func: null,
        arg: 0,
        timingMode: 0,
        timingValue: 0,
        currentFrameNumber: 0,
        queue: [],
        pause: function () {
          Browser.mainLoop.scheduler = null
          Browser.mainLoop.currentlyRunningMainloop++
        },
        resume: function () {
          Browser.mainLoop.currentlyRunningMainloop++
          var timingMode = Browser.mainLoop.timingMode
          var timingValue = Browser.mainLoop.timingValue
          var func = Browser.mainLoop.func
          Browser.mainLoop.func = null
          _emscripten_set_main_loop(func, 0, false, Browser.mainLoop.arg, true)
          _emscripten_set_main_loop_timing(timingMode, timingValue)
          Browser.mainLoop.scheduler()
        },
        updateStatus: function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...'
            var remaining = Browser.mainLoop.remainingBlockers
            var expected = Browser.mainLoop.expectedBlockers
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')')
              } else {
                Module['setStatus'](message)
              }
            } else {
              Module['setStatus']('')
            }
          }
        },
        runIter: function (func) {
          if (ABORT) return
          if (Module['preMainLoop']) {
            var preRet = Module['preMainLoop']()
            if (preRet === false) {
              return
            }
          }
          try {
            func()
          } catch (e) {
            if (e instanceof ExitStatus) {
              return
            } else {
              if (e && typeof e === 'object' && e.stack) err('exception thrown: ' + [e, e.stack])
              throw e
            }
          }
          if (Module['postMainLoop']) Module['postMainLoop']()
        }
      },
      isFullscreen: false,
      pointerLock: false,
      moduleContextCreatedCallbacks: [],
      workers: [],
      init: function () {
        if (!Module['preloadPlugins']) Module['preloadPlugins'] = []
        if (Browser.initted) return
        Browser.initted = true
        try {
          new Blob()
          Browser.hasBlobConstructor = true
        } catch (e) {
          Browser.hasBlobConstructor = false
          console.log('warning: no blob constructor, cannot create blobs with mimetypes')
        }
        Browser.BlobBuilder =
          typeof MozBlobBuilder != 'undefined'
            ? MozBlobBuilder
            : typeof WebKitBlobBuilder != 'undefined'
            ? WebKitBlobBuilder
            : !Browser.hasBlobConstructor
            ? console.log('warning: no BlobBuilder')
            : null
        Browser.URLObject =
          typeof window != 'undefined' ? (window.URL ? window.URL : window.webkitURL) : undefined
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log(
            'warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.'
          )
          Module.noImageDecoding = true
        }
        var imagePlugin = {}
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name)
        }
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) })
              if (b.size !== byteArray.length) {
                b = new Blob([new Uint8Array(byteArray).buffer], {
                  type: Browser.getMimetype(name)
                })
              }
            } catch (e) {
              warnOnce(
                'Blob constructor present but fails: ' + e + '; falling back to blob builder'
              )
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder()
            bb.append(new Uint8Array(byteArray).buffer)
            b = bb.getBlob()
          }
          var url = Browser.URLObject.createObjectURL(b)
          var img = new Image()
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded')
            var canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            var ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            Module['preloadedImages'][name] = canvas
            Browser.URLObject.revokeObjectURL(url)
            if (onload) onload(byteArray)
          }
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded')
            if (onerror) onerror()
          }
          img.src = url
        }
        Module['preloadPlugins'].push(imagePlugin)
        var audioPlugin = {}
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 }
        }
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false
          function finish(audio) {
            if (done) return
            done = true
            Module['preloadedAudios'][name] = audio
            if (onload) onload(byteArray)
          }
          function fail() {
            if (done) return
            done = true
            Module['preloadedAudios'][name] = new Audio()
            if (onerror) onerror()
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) })
            } catch (e) {
              return fail()
            }
            var url = Browser.URLObject.createObjectURL(b)
            var audio = new Audio()
            audio.addEventListener(
              'canplaythrough',
              function () {
                finish(audio)
              },
              false
            )
            audio.onerror = function audio_onerror(event) {
              if (done) return
              console.log(
                'warning: browser could not fully decode audio ' +
                  name +
                  ', trying slower base64 approach'
              )
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
                var PAD = '='
                var ret = ''
                var leftchar = 0
                var leftbits = 0
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i]
                  leftbits += 8
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits - 6)) & 63
                    leftbits -= 6
                    ret += BASE[curr]
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar & 3) << 4]
                  ret += PAD + PAD
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar & 15) << 2]
                  ret += PAD
                }
                return ret
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray)
              finish(audio)
            }
            audio.src = url
            Browser.safeSetTimeout(function () {
              finish(audio)
            }, 1e4)
          } else {
            return fail()
          }
        }
        Module['preloadPlugins'].push(audioPlugin)
        function pointerLockChange() {
          Browser.pointerLock =
            document['pointerLockElement'] === Module['canvas'] ||
            document['mozPointerLockElement'] === Module['canvas'] ||
            document['webkitPointerLockElement'] === Module['canvas'] ||
            document['msPointerLockElement'] === Module['canvas']
        }
        var canvas = Module['canvas']
        if (canvas) {
          canvas.requestPointerLock =
            canvas['requestPointerLock'] ||
            canvas['mozRequestPointerLock'] ||
            canvas['webkitRequestPointerLock'] ||
            canvas['msRequestPointerLock'] ||
            function () {}
          canvas.exitPointerLock =
            document['exitPointerLock'] ||
            document['mozExitPointerLock'] ||
            document['webkitExitPointerLock'] ||
            document['msExitPointerLock'] ||
            function () {}
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document)
          document.addEventListener('pointerlockchange', pointerLockChange, false)
          document.addEventListener('mozpointerlockchange', pointerLockChange, false)
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false)
          document.addEventListener('mspointerlockchange', pointerLockChange, false)
          if (Module['elementPointerLock']) {
            canvas.addEventListener(
              'click',
              function (ev) {
                if (!Browser.pointerLock && Module['canvas'].requestPointerLock) {
                  Module['canvas'].requestPointerLock()
                  ev.preventDefault()
                }
              },
              false
            )
          }
        }
      },
      createContext: function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx
        var ctx
        var contextHandle
        if (useWebGL) {
          var contextAttributes = {
            antialias: false,
            alpha: false,
            majorVersion: typeof WebGL2RenderingContext !== 'undefined' ? 2 : 1
          }
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute]
            }
          }
          if (typeof GL !== 'undefined') {
            contextHandle = GL.createContext(canvas, contextAttributes)
            if (contextHandle) {
              ctx = GL.getContext(contextHandle).GLctx
            }
          }
        } else {
          ctx = canvas.getContext('2d')
        }
        if (!ctx) return null
        if (setInModule) {
          if (!useWebGL)
            assert(
              typeof GLctx === 'undefined',
              'cannot set in module if GLctx is used, but we are a non-GL context that would replace it'
            )
          Module.ctx = ctx
          if (useWebGL) GL.makeContextCurrent(contextHandle)
          Module.useWebGL = useWebGL
          Browser.moduleContextCreatedCallbacks.forEach(function (callback) {
            callback()
          })
          Browser.init()
        }
        return ctx
      },
      destroyContext: function (canvas, useWebGL, setInModule) {},
      fullscreenHandlersInstalled: false,
      lockPointer: undefined,
      resizeCanvas: undefined,
      requestFullscreen: function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer
        Browser.resizeCanvas = resizeCanvas
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false
        var canvas = Module['canvas']
        function fullscreenChange() {
          Browser.isFullscreen = false
          var canvasContainer = canvas.parentNode
          if (
            (document['fullscreenElement'] ||
              document['mozFullScreenElement'] ||
              document['msFullscreenElement'] ||
              document['webkitFullscreenElement'] ||
              document['webkitCurrentFullScreenElement']) === canvasContainer
          ) {
            canvas.exitFullscreen = Browser.exitFullscreen
            if (Browser.lockPointer) canvas.requestPointerLock()
            Browser.isFullscreen = true
            if (Browser.resizeCanvas) {
              Browser.setFullscreenCanvasSize()
            } else {
              Browser.updateCanvasDimensions(canvas)
            }
          } else {
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer)
            canvasContainer.parentNode.removeChild(canvasContainer)
            if (Browser.resizeCanvas) {
              Browser.setWindowedCanvasSize()
            } else {
              Browser.updateCanvasDimensions(canvas)
            }
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullscreen)
          if (Module['onFullscreen']) Module['onFullscreen'](Browser.isFullscreen)
        }
        if (!Browser.fullscreenHandlersInstalled) {
          Browser.fullscreenHandlersInstalled = true
          document.addEventListener('fullscreenchange', fullscreenChange, false)
          document.addEventListener('mozfullscreenchange', fullscreenChange, false)
          document.addEventListener('webkitfullscreenchange', fullscreenChange, false)
          document.addEventListener('MSFullscreenChange', fullscreenChange, false)
        }
        var canvasContainer = document.createElement('div')
        canvas.parentNode.insertBefore(canvasContainer, canvas)
        canvasContainer.appendChild(canvas)
        canvasContainer.requestFullscreen =
          canvasContainer['requestFullscreen'] ||
          canvasContainer['mozRequestFullScreen'] ||
          canvasContainer['msRequestFullscreen'] ||
          (canvasContainer['webkitRequestFullscreen']
            ? function () {
                canvasContainer['webkitRequestFullscreen'](Element['ALLOW_KEYBOARD_INPUT'])
              }
            : null) ||
          (canvasContainer['webkitRequestFullScreen']
            ? function () {
                canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT'])
              }
            : null)
        canvasContainer.requestFullscreen()
      },
      exitFullscreen: function () {
        if (!Browser.isFullscreen) {
          return false
        }
        var CFS =
          document['exitFullscreen'] ||
          document['cancelFullScreen'] ||
          document['mozCancelFullScreen'] ||
          document['msExitFullscreen'] ||
          document['webkitCancelFullScreen'] ||
          function () {}
        CFS.apply(document, [])
        return true
      },
      nextRAF: 0,
      fakeRequestAnimationFrame: function (func) {
        var now = Date.now()
        if (Browser.nextRAF === 0) {
          Browser.nextRAF = now + 1e3 / 60
        } else {
          while (now + 2 >= Browser.nextRAF) {
            Browser.nextRAF += 1e3 / 60
          }
        }
        var delay = Math.max(Browser.nextRAF - now, 0)
        setTimeout(func, delay)
      },
      requestAnimationFrame: function (func) {
        if (typeof requestAnimationFrame === 'function') {
          requestAnimationFrame(func)
          return
        }
        var RAF = Browser.fakeRequestAnimationFrame
        RAF(func)
      },
      safeCallback: function (func) {
        return function () {
          if (!ABORT) return func.apply(null, arguments)
        }
      },
      allowAsyncCallbacks: true,
      queuedAsyncCallbacks: [],
      pauseAsyncCallbacks: function () {
        Browser.allowAsyncCallbacks = false
      },
      resumeAsyncCallbacks: function () {
        Browser.allowAsyncCallbacks = true
        if (Browser.queuedAsyncCallbacks.length > 0) {
          var callbacks = Browser.queuedAsyncCallbacks
          Browser.queuedAsyncCallbacks = []
          callbacks.forEach(function (func) {
            func()
          })
        }
      },
      safeRequestAnimationFrame: function (func) {
        return Browser.requestAnimationFrame(function () {
          if (ABORT) return
          if (Browser.allowAsyncCallbacks) {
            func()
          } else {
            Browser.queuedAsyncCallbacks.push(func)
          }
        })
      },
      safeSetTimeout: function (func, timeout) {
        noExitRuntime = true
        return setTimeout(function () {
          if (ABORT) return
          if (Browser.allowAsyncCallbacks) {
            func()
          } else {
            Browser.queuedAsyncCallbacks.push(func)
          }
        }, timeout)
      },
      safeSetInterval: function (func, timeout) {
        noExitRuntime = true
        return setInterval(function () {
          if (ABORT) return
          if (Browser.allowAsyncCallbacks) {
            func()
          }
        }, timeout)
      },
      getMimetype: function (name) {
        return {
          jpg: 'image/jpeg',
          jpeg: 'image/jpeg',
          png: 'image/png',
          bmp: 'image/bmp',
          ogg: 'audio/ogg',
          wav: 'audio/wav',
          mp3: 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.') + 1)]
      },
      getUserMedia: function (func) {
        if (!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] || navigator['mozGetUserMedia']
        }
        window.getUserMedia(func)
      },
      getMovementX: function (event) {
        return event['movementX'] || event['mozMovementX'] || event['webkitMovementX'] || 0
      },
      getMovementY: function (event) {
        return event['movementY'] || event['mozMovementY'] || event['webkitMovementY'] || 0
      },
      getMouseWheelDelta: function (event) {
        var delta = 0
        switch (event.type) {
          case 'DOMMouseScroll':
            delta = event.detail / 3
            break
          case 'mousewheel':
            delta = event.wheelDelta / 120
            break
          case 'wheel':
            delta = event.deltaY
            switch (event.deltaMode) {
              case 0:
                delta /= 100
                break
              case 1:
                delta /= 3
                break
              case 2:
                delta *= 80
                break
              default:
                throw 'unrecognized mouse wheel delta mode: ' + event.deltaMode
            }
            break
          default:
            throw 'unrecognized mouse wheel event: ' + event.type
        }
        return delta
      },
      mouseX: 0,
      mouseY: 0,
      mouseMovementX: 0,
      mouseMovementY: 0,
      touches: {},
      lastTouches: {},
      calculateMouseEvent: function (event) {
        if (Browser.pointerLock) {
          if (event.type != 'mousemove' && 'mozMovementX' in event) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event)
            Browser.mouseMovementY = Browser.getMovementY(event)
          }
          if (typeof SDL != 'undefined') {
            Browser.mouseX = SDL.mouseX + Browser.mouseMovementX
            Browser.mouseY = SDL.mouseY + Browser.mouseMovementY
          } else {
            Browser.mouseX += Browser.mouseMovementX
            Browser.mouseY += Browser.mouseMovementY
          }
        } else {
          var rect = Module['canvas'].getBoundingClientRect()
          var cw = Module['canvas'].width
          var ch = Module['canvas'].height
          var scrollX = typeof window.scrollX !== 'undefined' ? window.scrollX : window.pageXOffset
          var scrollY = typeof window.scrollY !== 'undefined' ? window.scrollY : window.pageYOffset
          if (
            event.type === 'touchstart' ||
            event.type === 'touchend' ||
            event.type === 'touchmove'
          ) {
            var touch = event.touch
            if (touch === undefined) {
              return
            }
            var adjustedX = touch.pageX - (scrollX + rect.left)
            var adjustedY = touch.pageY - (scrollY + rect.top)
            adjustedX = adjustedX * (cw / rect.width)
            adjustedY = adjustedY * (ch / rect.height)
            var coords = { x: adjustedX, y: adjustedY }
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords
              Browser.touches[touch.identifier] = coords
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              var last = Browser.touches[touch.identifier]
              if (!last) last = coords
              Browser.lastTouches[touch.identifier] = last
              Browser.touches[touch.identifier] = coords
            }
            return
          }
          var x = event.pageX - (scrollX + rect.left)
          var y = event.pageY - (scrollY + rect.top)
          x = x * (cw / rect.width)
          y = y * (ch / rect.height)
          Browser.mouseMovementX = x - Browser.mouseX
          Browser.mouseMovementY = y - Browser.mouseY
          Browser.mouseX = x
          Browser.mouseY = y
        }
      },
      asyncLoad: function (url, onload, onerror, noRunDep) {
        var dep = !noRunDep ? getUniqueRunDependency('al ' + url) : ''
        readAsync(
          url,
          function (arrayBuffer) {
            assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).')
            onload(new Uint8Array(arrayBuffer))
            if (dep) removeRunDependency(dep)
          },
          function (event) {
            if (onerror) {
              onerror()
            } else {
              throw 'Loading data file "' + url + '" failed.'
            }
          }
        )
        if (dep) addRunDependency(dep)
      },
      resizeListeners: [],
      updateResizeListeners: function () {
        var canvas = Module['canvas']
        Browser.resizeListeners.forEach(function (listener) {
          listener(canvas.width, canvas.height)
        })
      },
      setCanvasSize: function (width, height, noUpdates) {
        var canvas = Module['canvas']
        Browser.updateCanvasDimensions(canvas, width, height)
        if (!noUpdates) Browser.updateResizeListeners()
      },
      windowedWidth: 0,
      windowedHeight: 0,
      setFullscreenCanvasSize: function () {
        if (typeof SDL != 'undefined') {
          var flags = HEAPU32[SDL.screen >> 2]
          flags = flags | 8388608
          HEAP32[SDL.screen >> 2] = flags
        }
        Browser.updateCanvasDimensions(Module['canvas'])
        Browser.updateResizeListeners()
      },
      setWindowedCanvasSize: function () {
        if (typeof SDL != 'undefined') {
          var flags = HEAPU32[SDL.screen >> 2]
          flags = flags & ~8388608
          HEAP32[SDL.screen >> 2] = flags
        }
        Browser.updateCanvasDimensions(Module['canvas'])
        Browser.updateResizeListeners()
      },
      updateCanvasDimensions: function (canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative
          canvas.heightNative = hNative
        } else {
          wNative = canvas.widthNative
          hNative = canvas.heightNative
        }
        var w = wNative
        var h = hNative
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w / h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio'])
          } else {
            h = Math.round(w / Module['forcedAspectRatio'])
          }
        }
        if (
          (document['fullscreenElement'] ||
            document['mozFullScreenElement'] ||
            document['msFullscreenElement'] ||
            document['webkitFullscreenElement'] ||
            document['webkitCurrentFullScreenElement']) === canvas.parentNode &&
          typeof screen != 'undefined'
        ) {
          var factor = Math.min(screen.width / w, screen.height / h)
          w = Math.round(w * factor)
          h = Math.round(h * factor)
        }
        if (Browser.resizeCanvas) {
          if (canvas.width != w) canvas.width = w
          if (canvas.height != h) canvas.height = h
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty('width')
            canvas.style.removeProperty('height')
          }
        } else {
          if (canvas.width != wNative) canvas.width = wNative
          if (canvas.height != hNative) canvas.height = hNative
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty('width', w + 'px', 'important')
              canvas.style.setProperty('height', h + 'px', 'important')
            } else {
              canvas.style.removeProperty('width')
              canvas.style.removeProperty('height')
            }
          }
        }
      },
      wgetRequests: {},
      nextWgetRequestHandle: 0,
      getNextWgetRequestHandle: function () {
        var handle = Browser.nextWgetRequestHandle
        Browser.nextWgetRequestHandle++
        return handle
      }
    }
    var EGL = {
      errorCode: 12288,
      defaultDisplayInitialized: false,
      currentContext: 0,
      currentReadSurface: 0,
      currentDrawSurface: 0,
      contextAttributes: { alpha: false, depth: false, stencil: false, antialias: false },
      stringCache: {},
      setErrorCode: function (code) {
        EGL.errorCode = code
      },
      chooseConfig: function (display, attribList, config, config_size, numConfigs) {
        if (display != 62e3) {
          EGL.setErrorCode(12296)
          return 0
        }
        if (attribList) {
          for (;;) {
            var param = HEAP32[attribList >> 2]
            if (param == 12321) {
              var alphaSize = HEAP32[(attribList + 4) >> 2]
              EGL.contextAttributes.alpha = alphaSize > 0
            } else if (param == 12325) {
              var depthSize = HEAP32[(attribList + 4) >> 2]
              EGL.contextAttributes.depth = depthSize > 0
            } else if (param == 12326) {
              var stencilSize = HEAP32[(attribList + 4) >> 2]
              EGL.contextAttributes.stencil = stencilSize > 0
            } else if (param == 12337) {
              var samples = HEAP32[(attribList + 4) >> 2]
              EGL.contextAttributes.antialias = samples > 0
            } else if (param == 12338) {
              var samples = HEAP32[(attribList + 4) >> 2]
              EGL.contextAttributes.antialias = samples == 1
            } else if (param == 12544) {
              var requestedPriority = HEAP32[(attribList + 4) >> 2]
              EGL.contextAttributes.lowLatency = requestedPriority != 12547
            } else if (param == 12344) {
              break
            }
            attribList += 8
          }
        }
        if ((!config || !config_size) && !numConfigs) {
          EGL.setErrorCode(12300)
          return 0
        }
        if (numConfigs) {
          HEAP32[numConfigs >> 2] = 1
        }
        if (config && config_size > 0) {
          HEAP32[config >> 2] = 62002
        }
        EGL.setErrorCode(12288)
        return 1
      }
    }
    function _eglGetProcAddress(name_) {
      return _emscripten_GetProcAddress(name_)
    }
    function _emscripten_cancel_main_loop() {
      Browser.mainLoop.pause()
      Browser.mainLoop.func = null
    }
    function _emscripten_force_exit(status) {
      noExitRuntime = false
      exit(status)
    }
    function _emscripten_get_heap_size() {
      return HEAPU8.length
    }
    function __webgl_acquireInstancedArraysExtension(ctx) {
      var ext = ctx.getExtension('ANGLE_instanced_arrays')
      if (ext) {
        ctx['vertexAttribDivisor'] = function (index, divisor) {
          ext['vertexAttribDivisorANGLE'](index, divisor)
        }
        ctx['drawArraysInstanced'] = function (mode, first, count, primcount) {
          ext['drawArraysInstancedANGLE'](mode, first, count, primcount)
        }
        ctx['drawElementsInstanced'] = function (mode, count, type, indices, primcount) {
          ext['drawElementsInstancedANGLE'](mode, count, type, indices, primcount)
        }
      }
    }
    function __webgl_acquireVertexArrayObjectExtension(ctx) {
      var ext = ctx.getExtension('OES_vertex_array_object')
      if (ext) {
        ctx['createVertexArray'] = function () {
          return ext['createVertexArrayOES']()
        }
        ctx['deleteVertexArray'] = function (vao) {
          ext['deleteVertexArrayOES'](vao)
        }
        ctx['bindVertexArray'] = function (vao) {
          ext['bindVertexArrayOES'](vao)
        }
        ctx['isVertexArray'] = function (vao) {
          return ext['isVertexArrayOES'](vao)
        }
      }
    }
    function __webgl_acquireDrawBuffersExtension(ctx) {
      var ext = ctx.getExtension('WEBGL_draw_buffers')
      if (ext) {
        ctx['drawBuffers'] = function (n, bufs) {
          ext['drawBuffersWEBGL'](n, bufs)
        }
      }
    }
    var GL = {
      counter: 1,
      lastError: 0,
      buffers: [],
      mappedBuffers: {},
      programs: [],
      framebuffers: [],
      renderbuffers: [],
      textures: [],
      uniforms: [],
      shaders: [],
      vaos: [],
      contexts: {},
      currentContext: null,
      offscreenCanvases: {},
      timerQueriesEXT: [],
      queries: [],
      samplers: [],
      transformFeedbacks: [],
      syncs: [],
      programInfos: {},
      stringCache: {},
      stringiCache: {},
      unpackAlignment: 4,
      init: function () {
        var miniTempFloatBuffer = new Float32Array(GL.MINI_TEMP_BUFFER_SIZE)
        for (var i = 0; i < GL.MINI_TEMP_BUFFER_SIZE; i++) {
          GL.miniTempBufferFloatViews[i] = miniTempFloatBuffer.subarray(0, i + 1)
        }
        var miniTempIntBuffer = new Int32Array(GL.MINI_TEMP_BUFFER_SIZE)
        for (var i = 0; i < GL.MINI_TEMP_BUFFER_SIZE; i++) {
          GL.miniTempBufferIntViews[i] = miniTempIntBuffer.subarray(0, i + 1)
        }
      },
      recordError: function recordError(errorCode) {
        if (!GL.lastError) {
          GL.lastError = errorCode
        }
      },
      getNewId: function (table) {
        var ret = GL.counter++
        for (var i = table.length; i < ret; i++) {
          table[i] = null
        }
        return ret
      },
      MINI_TEMP_BUFFER_SIZE: 256,
      miniTempBufferFloatViews: [0],
      miniTempBufferIntViews: [0],
      getSource: function (shader, count, string, length) {
        var source = ''
        for (var i = 0; i < count; ++i) {
          var len = length ? HEAP32[(length + i * 4) >> 2] : -1
          source += UTF8ToString(HEAP32[(string + i * 4) >> 2], len < 0 ? undefined : len)
        }
        return source
      },
      createContext: function (canvas, webGLContextAttributes) {
        if (webGLContextAttributes.renderViaOffscreenBackBuffer)
          webGLContextAttributes['preserveDrawingBuffer'] = true
        var ctx =
          webGLContextAttributes.majorVersion > 1
            ? canvas.getContext('webgl2', webGLContextAttributes)
            : canvas.getContext('webgl', webGLContextAttributes)
        if (!ctx) return 0
        var handle = GL.registerContext(ctx, webGLContextAttributes)
        return handle
      },
      enableOffscreenFramebufferAttributes: function (webGLContextAttributes) {
        webGLContextAttributes.renderViaOffscreenBackBuffer = true
        webGLContextAttributes.preserveDrawingBuffer = true
      },
      createOffscreenFramebuffer: function (context) {
        var gl = context.GLctx
        var fbo = gl.createFramebuffer()
        gl.bindFramebuffer(36160, fbo)
        context.defaultFbo = fbo
        context.defaultFboForbidBlitFramebuffer = false
        if (gl.getContextAttributes().antialias) {
          context.defaultFboForbidBlitFramebuffer = true
        } else {
          var firefoxMatch = navigator.userAgent.toLowerCase().match(/firefox\/(\d\d)/)
          if (firefoxMatch != null) {
            var firefoxVersion = firefoxMatch[1]
            context.defaultFboForbidBlitFramebuffer = firefoxVersion < 67
          }
        }
        context.defaultColorTarget = gl.createTexture()
        context.defaultDepthTarget = gl.createRenderbuffer()
        GL.resizeOffscreenFramebuffer(context)
        gl.bindTexture(3553, context.defaultColorTarget)
        gl.texParameteri(3553, 10241, 9728)
        gl.texParameteri(3553, 10240, 9728)
        gl.texParameteri(3553, 10242, 33071)
        gl.texParameteri(3553, 10243, 33071)
        gl.texImage2D(3553, 0, 6408, gl.canvas.width, gl.canvas.height, 0, 6408, 5121, null)
        gl.framebufferTexture2D(36160, 36064, 3553, context.defaultColorTarget, 0)
        gl.bindTexture(3553, null)
        var depthTarget = gl.createRenderbuffer()
        gl.bindRenderbuffer(36161, context.defaultDepthTarget)
        gl.renderbufferStorage(36161, 33189, gl.canvas.width, gl.canvas.height)
        gl.framebufferRenderbuffer(36160, 36096, 36161, context.defaultDepthTarget)
        gl.bindRenderbuffer(36161, null)
        var vertices = [-1, -1, -1, 1, 1, -1, 1, 1]
        var vb = gl.createBuffer()
        gl.bindBuffer(34962, vb)
        gl.bufferData(34962, new Float32Array(vertices), 35044)
        gl.bindBuffer(34962, null)
        context.blitVB = vb
        var vsCode =
          'attribute vec2 pos;' +
          'varying lowp vec2 tex;' +
          'void main() { tex = pos * 0.5 + vec2(0.5,0.5); gl_Position = vec4(pos, 0.0, 1.0); }'
        var vs = gl.createShader(35633)
        gl.shaderSource(vs, vsCode)
        gl.compileShader(vs)
        var fsCode =
          'varying lowp vec2 tex;' +
          'uniform sampler2D sampler;' +
          'void main() { gl_FragColor = texture2D(sampler, tex); }'
        var fs = gl.createShader(35632)
        gl.shaderSource(fs, fsCode)
        gl.compileShader(fs)
        var blitProgram = gl.createProgram()
        gl.attachShader(blitProgram, vs)
        gl.attachShader(blitProgram, fs)
        gl.linkProgram(blitProgram)
        context.blitProgram = blitProgram
        context.blitPosLoc = gl.getAttribLocation(blitProgram, 'pos')
        gl.useProgram(blitProgram)
        gl.uniform1i(gl.getUniformLocation(blitProgram, 'sampler'), 0)
        gl.useProgram(null)
        context.defaultVao = undefined
        if (gl.createVertexArray) {
          context.defaultVao = gl.createVertexArray()
          gl.bindVertexArray(context.defaultVao)
          gl.enableVertexAttribArray(context.blitPosLoc)
          gl.bindVertexArray(null)
        }
      },
      resizeOffscreenFramebuffer: function (context) {
        var gl = context.GLctx
        if (context.defaultColorTarget) {
          var prevTextureBinding = gl.getParameter(32873)
          gl.bindTexture(3553, context.defaultColorTarget)
          gl.texImage2D(
            3553,
            0,
            6408,
            gl.drawingBufferWidth,
            gl.drawingBufferHeight,
            0,
            6408,
            5121,
            null
          )
          gl.bindTexture(3553, prevTextureBinding)
        }
        if (context.defaultDepthTarget) {
          var prevRenderBufferBinding = gl.getParameter(36007)
          gl.bindRenderbuffer(36161, context.defaultDepthTarget)
          gl.renderbufferStorage(36161, 33189, gl.drawingBufferWidth, gl.drawingBufferHeight)
          gl.bindRenderbuffer(36161, prevRenderBufferBinding)
        }
      },
      blitOffscreenFramebuffer: function (context) {
        var gl = context.GLctx
        var prevScissorTest = gl.getParameter(3089)
        if (prevScissorTest) gl.disable(3089)
        var prevFbo = gl.getParameter(36006)
        if (gl.blitFramebuffer && !context.defaultFboForbidBlitFramebuffer) {
          gl.bindFramebuffer(36008, context.defaultFbo)
          gl.bindFramebuffer(36009, null)
          gl.blitFramebuffer(
            0,
            0,
            gl.canvas.width,
            gl.canvas.height,
            0,
            0,
            gl.canvas.width,
            gl.canvas.height,
            16384,
            9728
          )
        } else {
          gl.bindFramebuffer(36160, null)
          var prevProgram = gl.getParameter(35725)
          gl.useProgram(context.blitProgram)
          var prevVB = gl.getParameter(34964)
          gl.bindBuffer(34962, context.blitVB)
          var prevActiveTexture = gl.getParameter(34016)
          gl.activeTexture(33984)
          var prevTextureBinding = gl.getParameter(32873)
          gl.bindTexture(3553, context.defaultColorTarget)
          var prevBlend = gl.getParameter(3042)
          if (prevBlend) gl.disable(3042)
          var prevCullFace = gl.getParameter(2884)
          if (prevCullFace) gl.disable(2884)
          var prevDepthTest = gl.getParameter(2929)
          if (prevDepthTest) gl.disable(2929)
          var prevStencilTest = gl.getParameter(2960)
          if (prevStencilTest) gl.disable(2960)
          function draw() {
            gl.vertexAttribPointer(context.blitPosLoc, 2, 5126, false, 0, 0)
            gl.drawArrays(5, 0, 4)
          }
          if (context.defaultVao) {
            var prevVAO = gl.getParameter(34229)
            gl.bindVertexArray(context.defaultVao)
            draw()
            gl.bindVertexArray(prevVAO)
          } else {
            var prevVertexAttribPointer = {
              buffer: gl.getVertexAttrib(context.blitPosLoc, 34975),
              size: gl.getVertexAttrib(context.blitPosLoc, 34339),
              stride: gl.getVertexAttrib(context.blitPosLoc, 34340),
              type: gl.getVertexAttrib(context.blitPosLoc, 34341),
              normalized: gl.getVertexAttrib(context.blitPosLoc, 34922),
              pointer: gl.getVertexAttribOffset(context.blitPosLoc, 34373)
            }
            var maxVertexAttribs = gl.getParameter(34921)
            var prevVertexAttribEnables = []
            for (var i = 0; i < maxVertexAttribs; ++i) {
              var prevEnabled = gl.getVertexAttrib(i, 34338)
              var wantEnabled = i == context.blitPosLoc
              if (prevEnabled && !wantEnabled) {
                gl.disableVertexAttribArray(i)
              }
              if (!prevEnabled && wantEnabled) {
                gl.enableVertexAttribArray(i)
              }
              prevVertexAttribEnables[i] = prevEnabled
            }
            draw()
            for (var i = 0; i < maxVertexAttribs; ++i) {
              var prevEnabled = prevVertexAttribEnables[i]
              var nowEnabled = i == context.blitPosLoc
              if (prevEnabled && !nowEnabled) {
                gl.enableVertexAttribArray(i)
              }
              if (!prevEnabled && nowEnabled) {
                gl.disableVertexAttribArray(i)
              }
            }
            gl.bindBuffer(34962, prevVertexAttribPointer.buffer)
            gl.vertexAttribPointer(
              context.blitPosLoc,
              prevVertexAttribPointer.size,
              prevVertexAttribPointer.type,
              prevVertexAttribPointer.normalized,
              prevVertexAttribPointer.stride,
              prevVertexAttribPointer.offset
            )
          }
          if (prevStencilTest) gl.enable(2960)
          if (prevDepthTest) gl.enable(2929)
          if (prevCullFace) gl.enable(2884)
          if (prevBlend) gl.enable(3042)
          gl.bindTexture(3553, prevTextureBinding)
          gl.activeTexture(prevActiveTexture)
          gl.bindBuffer(34962, prevVB)
          gl.useProgram(prevProgram)
        }
        gl.bindFramebuffer(36160, prevFbo)
        if (prevScissorTest) gl.enable(3089)
      },
      registerContext: function (ctx, webGLContextAttributes) {
        var handle = _malloc(8)
        var context = {
          handle: handle,
          attributes: webGLContextAttributes,
          version: webGLContextAttributes.majorVersion,
          GLctx: ctx
        }
        if (ctx.canvas) ctx.canvas.GLctxObject = context
        GL.contexts[handle] = context
        if (
          typeof webGLContextAttributes.enableExtensionsByDefault === 'undefined' ||
          webGLContextAttributes.enableExtensionsByDefault
        ) {
          GL.initExtensions(context)
        }
        if (webGLContextAttributes.renderViaOffscreenBackBuffer)
          GL.createOffscreenFramebuffer(context)
        return handle
      },
      makeContextCurrent: function (contextHandle) {
        GL.currentContext = GL.contexts[contextHandle]
        Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx
        return !(contextHandle && !GLctx)
      },
      getContext: function (contextHandle) {
        return GL.contexts[contextHandle]
      },
      deleteContext: function (contextHandle) {
        if (GL.currentContext === GL.contexts[contextHandle]) GL.currentContext = null
        if (typeof JSEvents === 'object')
          JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas)
        if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas)
          GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined
        _free(GL.contexts[contextHandle].handle)
        GL.contexts[contextHandle] = null
      },
      initExtensions: function (context) {
        if (!context) context = GL.currentContext
        if (context.initExtensionsDone) return
        context.initExtensionsDone = true
        var GLctx = context.GLctx
        if (context.version < 2) {
          __webgl_acquireInstancedArraysExtension(GLctx)
          __webgl_acquireVertexArrayObjectExtension(GLctx)
          __webgl_acquireDrawBuffersExtension(GLctx)
        }
        GLctx.disjointTimerQueryExt = GLctx.getExtension('EXT_disjoint_timer_query')
        var automaticallyEnabledExtensions = [
          'OES_texture_float',
          'OES_texture_half_float',
          'OES_standard_derivatives',
          'OES_vertex_array_object',
          'WEBGL_compressed_texture_s3tc',
          'WEBGL_depth_texture',
          'OES_element_index_uint',
          'EXT_texture_filter_anisotropic',
          'EXT_frag_depth',
          'WEBGL_draw_buffers',
          'ANGLE_instanced_arrays',
          'OES_texture_float_linear',
          'OES_texture_half_float_linear',
          'EXT_blend_minmax',
          'EXT_shader_texture_lod',
          'EXT_texture_norm16',
          'WEBGL_compressed_texture_pvrtc',
          'EXT_color_buffer_half_float',
          'WEBGL_color_buffer_float',
          'EXT_sRGB',
          'WEBGL_compressed_texture_etc1',
          'EXT_disjoint_timer_query',
          'WEBGL_compressed_texture_etc',
          'WEBGL_compressed_texture_astc',
          'EXT_color_buffer_float',
          'WEBGL_compressed_texture_s3tc_srgb',
          'EXT_disjoint_timer_query_webgl2',
          'WEBKIT_WEBGL_compressed_texture_pvrtc'
        ]
        var exts = GLctx.getSupportedExtensions() || []
        exts.forEach(function (ext) {
          if (automaticallyEnabledExtensions.indexOf(ext) != -1) {
            GLctx.getExtension(ext)
          }
        })
      },
      populateUniformTable: function (program) {
        var p = GL.programs[program]
        var ptable = (GL.programInfos[program] = {
          uniforms: {},
          maxUniformLength: 0,
          maxAttributeLength: -1,
          maxUniformBlockNameLength: -1
        })
        var utable = ptable.uniforms
        var numUniforms = GLctx.getProgramParameter(p, 35718)
        for (var i = 0; i < numUniforms; ++i) {
          var u = GLctx.getActiveUniform(p, i)
          var name = u.name
          ptable.maxUniformLength = Math.max(ptable.maxUniformLength, name.length + 1)
          if (name.slice(-1) == ']') {
            name = name.slice(0, name.lastIndexOf('['))
          }
          var loc = GLctx.getUniformLocation(p, name)
          if (loc) {
            var id = GL.getNewId(GL.uniforms)
            utable[name] = [u.size, id]
            GL.uniforms[id] = loc
            for (var j = 1; j < u.size; ++j) {
              var n = name + '[' + j + ']'
              loc = GLctx.getUniformLocation(p, n)
              id = GL.getNewId(GL.uniforms)
              GL.uniforms[id] = loc
            }
          }
        }
      }
    }
    function _emscripten_glActiveTexture(x0) {
      GLctx['activeTexture'](x0)
    }
    function _emscripten_glAttachShader(program, shader) {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader])
    }
    function _emscripten_glBeginQuery(target, id) {
      GLctx['beginQuery'](target, GL.queries[id])
    }
    function _emscripten_glBeginQueryEXT(target, id) {
      GLctx.disjointTimerQueryExt['beginQueryEXT'](target, GL.timerQueriesEXT[id])
    }
    function _emscripten_glBeginTransformFeedback(x0) {
      GLctx['beginTransformFeedback'](x0)
    }
    function _emscripten_glBindAttribLocation(program, index, name) {
      GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name))
    }
    function _emscripten_glBindBuffer(target, buffer) {
      if (target == 35051) {
        GLctx.currentPixelPackBufferBinding = buffer
      } else if (target == 35052) {
        GLctx.currentPixelUnpackBufferBinding = buffer
      }
      GLctx.bindBuffer(target, GL.buffers[buffer])
    }
    function _emscripten_glBindBufferBase(target, index, buffer) {
      GLctx['bindBufferBase'](target, index, GL.buffers[buffer])
    }
    function _emscripten_glBindBufferRange(target, index, buffer, offset, ptrsize) {
      GLctx['bindBufferRange'](target, index, GL.buffers[buffer], offset, ptrsize)
    }
    function _emscripten_glBindFramebuffer(target, framebuffer) {
      GLctx.bindFramebuffer(
        target,
        framebuffer ? GL.framebuffers[framebuffer] : GL.currentContext.defaultFbo
      )
    }
    function _emscripten_glBindRenderbuffer(target, renderbuffer) {
      GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer])
    }
    function _emscripten_glBindSampler(unit, sampler) {
      GLctx['bindSampler'](unit, GL.samplers[sampler])
    }
    function _emscripten_glBindTexture(target, texture) {
      GLctx.bindTexture(target, GL.textures[texture])
    }
    function _emscripten_glBindTransformFeedback(target, id) {
      GLctx['bindTransformFeedback'](target, GL.transformFeedbacks[id])
    }
    function _emscripten_glBindVertexArray(vao) {
      GLctx['bindVertexArray'](GL.vaos[vao])
    }
    function _emscripten_glBindVertexArrayOES(vao) {
      GLctx['bindVertexArray'](GL.vaos[vao])
    }
    function _emscripten_glBlendColor(x0, x1, x2, x3) {
      GLctx['blendColor'](x0, x1, x2, x3)
    }
    function _emscripten_glBlendEquation(x0) {
      GLctx['blendEquation'](x0)
    }
    function _emscripten_glBlendEquationSeparate(x0, x1) {
      GLctx['blendEquationSeparate'](x0, x1)
    }
    function _emscripten_glBlendFunc(x0, x1) {
      GLctx['blendFunc'](x0, x1)
    }
    function _emscripten_glBlendFuncSeparate(x0, x1, x2, x3) {
      GLctx['blendFuncSeparate'](x0, x1, x2, x3)
    }
    function _emscripten_glBlitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) {
      GLctx['blitFramebuffer'](x0, x1, x2, x3, x4, x5, x6, x7, x8, x9)
    }
    function _emscripten_glBufferData(target, size, data, usage) {
      if (GL.currentContext.version >= 2) {
        if (data) {
          GLctx.bufferData(target, HEAPU8, usage, data, size)
        } else {
          GLctx.bufferData(target, size, usage)
        }
      } else {
        GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage)
      }
    }
    function _emscripten_glBufferSubData(target, offset, size, data) {
      if (GL.currentContext.version >= 2) {
        GLctx.bufferSubData(target, offset, HEAPU8, data, size)
        return
      }
      GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data + size))
    }
    function _emscripten_glCheckFramebufferStatus(x0) {
      return GLctx['checkFramebufferStatus'](x0)
    }
    function _emscripten_glClear(x0) {
      GLctx['clear'](x0)
    }
    function _emscripten_glClearBufferfi(x0, x1, x2, x3) {
      GLctx['clearBufferfi'](x0, x1, x2, x3)
    }
    function _emscripten_glClearBufferfv(buffer, drawbuffer, value) {
      GLctx['clearBufferfv'](buffer, drawbuffer, HEAPF32, value >> 2)
    }
    function _emscripten_glClearBufferiv(buffer, drawbuffer, value) {
      GLctx['clearBufferiv'](buffer, drawbuffer, HEAP32, value >> 2)
    }
    function _emscripten_glClearBufferuiv(buffer, drawbuffer, value) {
      GLctx['clearBufferuiv'](buffer, drawbuffer, HEAPU32, value >> 2)
    }
    function _emscripten_glClearColor(x0, x1, x2, x3) {
      GLctx['clearColor'](x0, x1, x2, x3)
    }
    function _emscripten_glClearDepthf(x0) {
      GLctx['clearDepth'](x0)
    }
    function _emscripten_glClearStencil(x0) {
      GLctx['clearStencil'](x0)
    }
    function convertI32PairToI53(lo, hi) {
      return (lo >>> 0) + hi * 4294967296
    }
    function _emscripten_glClientWaitSync(sync, flags, timeoutLo, timeoutHi) {
      return GLctx.clientWaitSync(GL.syncs[sync], flags, convertI32PairToI53(timeoutLo, timeoutHi))
    }
    function _emscripten_glColorMask(red, green, blue, alpha) {
      GLctx.colorMask(!!red, !!green, !!blue, !!alpha)
    }
    function _emscripten_glCompileShader(shader) {
      GLctx.compileShader(GL.shaders[shader])
    }
    function _emscripten_glCompressedTexImage2D(
      target,
      level,
      internalFormat,
      width,
      height,
      border,
      imageSize,
      data
    ) {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx['compressedTexImage2D'](
            target,
            level,
            internalFormat,
            width,
            height,
            border,
            imageSize,
            data
          )
        } else {
          GLctx['compressedTexImage2D'](
            target,
            level,
            internalFormat,
            width,
            height,
            border,
            HEAPU8,
            data,
            imageSize
          )
        }
        return
      }
      GLctx['compressedTexImage2D'](
        target,
        level,
        internalFormat,
        width,
        height,
        border,
        data ? HEAPU8.subarray(data, data + imageSize) : null
      )
    }
    function _emscripten_glCompressedTexImage3D(
      target,
      level,
      internalFormat,
      width,
      height,
      depth,
      border,
      imageSize,
      data
    ) {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx['compressedTexImage3D'](
          target,
          level,
          internalFormat,
          width,
          height,
          depth,
          border,
          imageSize,
          data
        )
      } else {
        GLctx['compressedTexImage3D'](
          target,
          level,
          internalFormat,
          width,
          height,
          depth,
          border,
          HEAPU8,
          data,
          imageSize
        )
      }
    }
    function _emscripten_glCompressedTexSubImage2D(
      target,
      level,
      xoffset,
      yoffset,
      width,
      height,
      format,
      imageSize,
      data
    ) {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx['compressedTexSubImage2D'](
            target,
            level,
            xoffset,
            yoffset,
            width,
            height,
            format,
            imageSize,
            data
          )
        } else {
          GLctx['compressedTexSubImage2D'](
            target,
            level,
            xoffset,
            yoffset,
            width,
            height,
            format,
            HEAPU8,
            data,
            imageSize
          )
        }
        return
      }
      GLctx['compressedTexSubImage2D'](
        target,
        level,
        xoffset,
        yoffset,
        width,
        height,
        format,
        data ? HEAPU8.subarray(data, data + imageSize) : null
      )
    }
    function _emscripten_glCompressedTexSubImage3D(
      target,
      level,
      xoffset,
      yoffset,
      zoffset,
      width,
      height,
      depth,
      format,
      imageSize,
      data
    ) {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx['compressedTexSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          imageSize,
          data
        )
      } else {
        GLctx['compressedTexSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          HEAPU8,
          data,
          imageSize
        )
      }
    }
    function _emscripten_glCopyBufferSubData(x0, x1, x2, x3, x4) {
      GLctx['copyBufferSubData'](x0, x1, x2, x3, x4)
    }
    function _emscripten_glCopyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7) {
      GLctx['copyTexImage2D'](x0, x1, x2, x3, x4, x5, x6, x7)
    }
    function _emscripten_glCopyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7) {
      GLctx['copyTexSubImage2D'](x0, x1, x2, x3, x4, x5, x6, x7)
    }
    function _emscripten_glCopyTexSubImage3D(x0, x1, x2, x3, x4, x5, x6, x7, x8) {
      GLctx['copyTexSubImage3D'](x0, x1, x2, x3, x4, x5, x6, x7, x8)
    }
    function _emscripten_glCreateProgram() {
      var id = GL.getNewId(GL.programs)
      var program = GLctx.createProgram()
      program.name = id
      GL.programs[id] = program
      return id
    }
    function _emscripten_glCreateShader(shaderType) {
      var id = GL.getNewId(GL.shaders)
      GL.shaders[id] = GLctx.createShader(shaderType)
      return id
    }
    function _emscripten_glCullFace(x0) {
      GLctx['cullFace'](x0)
    }
    function _emscripten_glDeleteBuffers(n, buffers) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(buffers + i * 4) >> 2]
        var buffer = GL.buffers[id]
        if (!buffer) continue
        GLctx.deleteBuffer(buffer)
        buffer.name = 0
        GL.buffers[id] = null
        if (id == GL.currArrayBuffer) GL.currArrayBuffer = 0
        if (id == GL.currElementArrayBuffer) GL.currElementArrayBuffer = 0
        if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0
        if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0
      }
    }
    function _emscripten_glDeleteFramebuffers(n, framebuffers) {
      for (var i = 0; i < n; ++i) {
        var id = HEAP32[(framebuffers + i * 4) >> 2]
        var framebuffer = GL.framebuffers[id]
        if (!framebuffer) continue
        GLctx.deleteFramebuffer(framebuffer)
        framebuffer.name = 0
        GL.framebuffers[id] = null
      }
    }
    function _emscripten_glDeleteProgram(id) {
      if (!id) return
      var program = GL.programs[id]
      if (!program) {
        GL.recordError(1281)
        return
      }
      GLctx.deleteProgram(program)
      program.name = 0
      GL.programs[id] = null
      GL.programInfos[id] = null
    }
    function _emscripten_glDeleteQueries(n, ids) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(ids + i * 4) >> 2]
        var query = GL.queries[id]
        if (!query) continue
        GLctx['deleteQuery'](query)
        GL.queries[id] = null
      }
    }
    function _emscripten_glDeleteQueriesEXT(n, ids) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(ids + i * 4) >> 2]
        var query = GL.timerQueriesEXT[id]
        if (!query) continue
        GLctx.disjointTimerQueryExt['deleteQueryEXT'](query)
        GL.timerQueriesEXT[id] = null
      }
    }
    function _emscripten_glDeleteRenderbuffers(n, renderbuffers) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(renderbuffers + i * 4) >> 2]
        var renderbuffer = GL.renderbuffers[id]
        if (!renderbuffer) continue
        GLctx.deleteRenderbuffer(renderbuffer)
        renderbuffer.name = 0
        GL.renderbuffers[id] = null
      }
    }
    function _emscripten_glDeleteSamplers(n, samplers) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(samplers + i * 4) >> 2]
        var sampler = GL.samplers[id]
        if (!sampler) continue
        GLctx['deleteSampler'](sampler)
        sampler.name = 0
        GL.samplers[id] = null
      }
    }
    function _emscripten_glDeleteShader(id) {
      if (!id) return
      var shader = GL.shaders[id]
      if (!shader) {
        GL.recordError(1281)
        return
      }
      GLctx.deleteShader(shader)
      GL.shaders[id] = null
    }
    function _emscripten_glDeleteSync(id) {
      if (!id) return
      var sync = GL.syncs[id]
      if (!sync) {
        GL.recordError(1281)
        return
      }
      GLctx.deleteSync(sync)
      sync.name = 0
      GL.syncs[id] = null
    }
    function _emscripten_glDeleteTextures(n, textures) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(textures + i * 4) >> 2]
        var texture = GL.textures[id]
        if (!texture) continue
        GLctx.deleteTexture(texture)
        texture.name = 0
        GL.textures[id] = null
      }
    }
    function _emscripten_glDeleteTransformFeedbacks(n, ids) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(ids + i * 4) >> 2]
        var transformFeedback = GL.transformFeedbacks[id]
        if (!transformFeedback) continue
        GLctx['deleteTransformFeedback'](transformFeedback)
        transformFeedback.name = 0
        GL.transformFeedbacks[id] = null
      }
    }
    function _emscripten_glDeleteVertexArrays(n, vaos) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(vaos + i * 4) >> 2]
        GLctx['deleteVertexArray'](GL.vaos[id])
        GL.vaos[id] = null
      }
    }
    function _emscripten_glDeleteVertexArraysOES(n, vaos) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(vaos + i * 4) >> 2]
        GLctx['deleteVertexArray'](GL.vaos[id])
        GL.vaos[id] = null
      }
    }
    function _emscripten_glDepthFunc(x0) {
      GLctx['depthFunc'](x0)
    }
    function _emscripten_glDepthMask(flag) {
      GLctx.depthMask(!!flag)
    }
    function _emscripten_glDepthRangef(x0, x1) {
      GLctx['depthRange'](x0, x1)
    }
    function _emscripten_glDetachShader(program, shader) {
      GLctx.detachShader(GL.programs[program], GL.shaders[shader])
    }
    function _emscripten_glDisable(x0) {
      GLctx['disable'](x0)
    }
    function _emscripten_glDisableVertexAttribArray(index) {
      GLctx.disableVertexAttribArray(index)
    }
    function _emscripten_glDrawArrays(mode, first, count) {
      GLctx.drawArrays(mode, first, count)
    }
    function _emscripten_glDrawArraysInstanced(mode, first, count, primcount) {
      GLctx['drawArraysInstanced'](mode, first, count, primcount)
    }
    function _emscripten_glDrawArraysInstancedANGLE(mode, first, count, primcount) {
      GLctx['drawArraysInstanced'](mode, first, count, primcount)
    }
    function _emscripten_glDrawArraysInstancedARB(mode, first, count, primcount) {
      GLctx['drawArraysInstanced'](mode, first, count, primcount)
    }
    function _emscripten_glDrawArraysInstancedEXT(mode, first, count, primcount) {
      GLctx['drawArraysInstanced'](mode, first, count, primcount)
    }
    function _emscripten_glDrawArraysInstancedNV(mode, first, count, primcount) {
      GLctx['drawArraysInstanced'](mode, first, count, primcount)
    }
    var __tempFixedLengthArray = []
    function _emscripten_glDrawBuffers(n, bufs) {
      var bufArray = __tempFixedLengthArray[n]
      for (var i = 0; i < n; i++) {
        bufArray[i] = HEAP32[(bufs + i * 4) >> 2]
      }
      GLctx['drawBuffers'](bufArray)
    }
    function _emscripten_glDrawBuffersEXT(n, bufs) {
      var bufArray = __tempFixedLengthArray[n]
      for (var i = 0; i < n; i++) {
        bufArray[i] = HEAP32[(bufs + i * 4) >> 2]
      }
      GLctx['drawBuffers'](bufArray)
    }
    function _emscripten_glDrawBuffersWEBGL(n, bufs) {
      var bufArray = __tempFixedLengthArray[n]
      for (var i = 0; i < n; i++) {
        bufArray[i] = HEAP32[(bufs + i * 4) >> 2]
      }
      GLctx['drawBuffers'](bufArray)
    }
    function _emscripten_glDrawElements(mode, count, type, indices) {
      GLctx.drawElements(mode, count, type, indices)
    }
    function _emscripten_glDrawElementsInstanced(mode, count, type, indices, primcount) {
      GLctx['drawElementsInstanced'](mode, count, type, indices, primcount)
    }
    function _emscripten_glDrawElementsInstancedANGLE(mode, count, type, indices, primcount) {
      GLctx['drawElementsInstanced'](mode, count, type, indices, primcount)
    }
    function _emscripten_glDrawElementsInstancedARB(mode, count, type, indices, primcount) {
      GLctx['drawElementsInstanced'](mode, count, type, indices, primcount)
    }
    function _emscripten_glDrawElementsInstancedEXT(mode, count, type, indices, primcount) {
      GLctx['drawElementsInstanced'](mode, count, type, indices, primcount)
    }
    function _emscripten_glDrawElementsInstancedNV(mode, count, type, indices, primcount) {
      GLctx['drawElementsInstanced'](mode, count, type, indices, primcount)
    }
    function _glDrawElements(mode, count, type, indices) {
      GLctx.drawElements(mode, count, type, indices)
    }
    function _emscripten_glDrawRangeElements(mode, start, end, count, type, indices) {
      _glDrawElements(mode, count, type, indices)
    }
    function _emscripten_glEnable(x0) {
      GLctx['enable'](x0)
    }
    function _emscripten_glEnableVertexAttribArray(index) {
      GLctx.enableVertexAttribArray(index)
    }
    function _emscripten_glEndQuery(x0) {
      GLctx['endQuery'](x0)
    }
    function _emscripten_glEndQueryEXT(target) {
      GLctx.disjointTimerQueryExt['endQueryEXT'](target)
    }
    function _emscripten_glEndTransformFeedback() {
      GLctx['endTransformFeedback']()
    }
    function _emscripten_glFenceSync(condition, flags) {
      var sync = GLctx.fenceSync(condition, flags)
      if (sync) {
        var id = GL.getNewId(GL.syncs)
        sync.name = id
        GL.syncs[id] = sync
        return id
      } else {
        return 0
      }
    }
    function _emscripten_glFinish() {
      GLctx['finish']()
    }
    function _emscripten_glFlush() {
      GLctx['flush']()
    }
    function _emscripten_glFramebufferRenderbuffer(
      target,
      attachment,
      renderbuffertarget,
      renderbuffer
    ) {
      GLctx.framebufferRenderbuffer(
        target,
        attachment,
        renderbuffertarget,
        GL.renderbuffers[renderbuffer]
      )
    }
    function _emscripten_glFramebufferTexture2D(target, attachment, textarget, texture, level) {
      GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level)
    }
    function _emscripten_glFramebufferTextureLayer(target, attachment, texture, level, layer) {
      GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer)
    }
    function _emscripten_glFrontFace(x0) {
      GLctx['frontFace'](x0)
    }
    function __glGenObject(n, buffers, createFunction, objectTable) {
      for (var i = 0; i < n; i++) {
        var buffer = GLctx[createFunction]()
        var id = buffer && GL.getNewId(objectTable)
        if (buffer) {
          buffer.name = id
          objectTable[id] = buffer
        } else {
          GL.recordError(1282)
        }
        HEAP32[(buffers + i * 4) >> 2] = id
      }
    }
    function _emscripten_glGenBuffers(n, buffers) {
      __glGenObject(n, buffers, 'createBuffer', GL.buffers)
    }
    function _emscripten_glGenFramebuffers(n, ids) {
      __glGenObject(n, ids, 'createFramebuffer', GL.framebuffers)
    }
    function _emscripten_glGenQueries(n, ids) {
      __glGenObject(n, ids, 'createQuery', GL.queries)
    }
    function _emscripten_glGenQueriesEXT(n, ids) {
      for (var i = 0; i < n; i++) {
        var query = GLctx.disjointTimerQueryExt['createQueryEXT']()
        if (!query) {
          GL.recordError(1282)
          while (i < n) HEAP32[(ids + i++ * 4) >> 2] = 0
          return
        }
        var id = GL.getNewId(GL.timerQueriesEXT)
        query.name = id
        GL.timerQueriesEXT[id] = query
        HEAP32[(ids + i * 4) >> 2] = id
      }
    }
    function _emscripten_glGenRenderbuffers(n, renderbuffers) {
      __glGenObject(n, renderbuffers, 'createRenderbuffer', GL.renderbuffers)
    }
    function _emscripten_glGenSamplers(n, samplers) {
      __glGenObject(n, samplers, 'createSampler', GL.samplers)
    }
    function _emscripten_glGenTextures(n, textures) {
      __glGenObject(n, textures, 'createTexture', GL.textures)
    }
    function _emscripten_glGenTransformFeedbacks(n, ids) {
      __glGenObject(n, ids, 'createTransformFeedback', GL.transformFeedbacks)
    }
    function _emscripten_glGenVertexArrays(n, arrays) {
      __glGenObject(n, arrays, 'createVertexArray', GL.vaos)
    }
    function _emscripten_glGenVertexArraysOES(n, arrays) {
      __glGenObject(n, arrays, 'createVertexArray', GL.vaos)
    }
    function _emscripten_glGenerateMipmap(x0) {
      GLctx['generateMipmap'](x0)
    }
    function _emscripten_glGetActiveAttrib(program, index, bufSize, length, size, type, name) {
      program = GL.programs[program]
      var info = GLctx.getActiveAttrib(program, index)
      if (!info) return
      var numBytesWrittenExclNull = bufSize > 0 && name ? stringToUTF8(info.name, name, bufSize) : 0
      if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
      if (size) HEAP32[size >> 2] = info.size
      if (type) HEAP32[type >> 2] = info.type
    }
    function _emscripten_glGetActiveUniform(program, index, bufSize, length, size, type, name) {
      program = GL.programs[program]
      var info = GLctx.getActiveUniform(program, index)
      if (!info) return
      var numBytesWrittenExclNull = bufSize > 0 && name ? stringToUTF8(info.name, name, bufSize) : 0
      if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
      if (size) HEAP32[size >> 2] = info.size
      if (type) HEAP32[type >> 2] = info.type
    }
    function _emscripten_glGetActiveUniformBlockName(
      program,
      uniformBlockIndex,
      bufSize,
      length,
      uniformBlockName
    ) {
      program = GL.programs[program]
      var result = GLctx['getActiveUniformBlockName'](program, uniformBlockIndex)
      if (!result) return
      if (uniformBlockName && bufSize > 0) {
        var numBytesWrittenExclNull = stringToUTF8(result, uniformBlockName, bufSize)
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
      } else {
        if (length) HEAP32[length >> 2] = 0
      }
    }
    function _emscripten_glGetActiveUniformBlockiv(program, uniformBlockIndex, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      program = GL.programs[program]
      switch (pname) {
        case 35393:
          var name = GLctx['getActiveUniformBlockName'](program, uniformBlockIndex)
          HEAP32[params >> 2] = name.length + 1
          return
        default:
          var result = GLctx['getActiveUniformBlockParameter'](program, uniformBlockIndex, pname)
          if (!result) return
          if (typeof result == 'number') {
            HEAP32[params >> 2] = result
          } else {
            for (var i = 0; i < result.length; i++) {
              HEAP32[(params + i * 4) >> 2] = result[i]
            }
          }
      }
    }
    function _emscripten_glGetActiveUniformsiv(
      program,
      uniformCount,
      uniformIndices,
      pname,
      params
    ) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      if (uniformCount > 0 && uniformIndices == 0) {
        GL.recordError(1281)
        return
      }
      program = GL.programs[program]
      var ids = []
      for (var i = 0; i < uniformCount; i++) {
        ids.push(HEAP32[(uniformIndices + i * 4) >> 2])
      }
      var result = GLctx['getActiveUniforms'](program, ids, pname)
      if (!result) return
      var len = result.length
      for (var i = 0; i < len; i++) {
        HEAP32[(params + i * 4) >> 2] = result[i]
      }
    }
    function _emscripten_glGetAttachedShaders(program, maxCount, count, shaders) {
      var result = GLctx.getAttachedShaders(GL.programs[program])
      var len = result.length
      if (len > maxCount) {
        len = maxCount
      }
      HEAP32[count >> 2] = len
      for (var i = 0; i < len; ++i) {
        var id = GL.shaders.indexOf(result[i])
        HEAP32[(shaders + i * 4) >> 2] = id
      }
    }
    function _emscripten_glGetAttribLocation(program, name) {
      return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name))
    }
    function writeI53ToI64(ptr, num) {
      HEAPU32[ptr >> 2] = num
      HEAPU32[(ptr + 4) >> 2] = (num - HEAPU32[ptr >> 2]) / 4294967296
    }
    function emscriptenWebGLGet(name_, p, type) {
      if (!p) {
        GL.recordError(1281)
        return
      }
      var ret = undefined
      switch (name_) {
        case 36346:
          ret = 1
          break
        case 36344:
          if (type != 0 && type != 1) {
            GL.recordError(1280)
          }
          return
        case 34814:
        case 36345:
          ret = 0
          break
        case 34466:
          var formats = GLctx.getParameter(34467)
          ret = formats ? formats.length : 0
          break
        case 33309:
          if (GL.currentContext.version < 2) {
            GL.recordError(1282)
            return
          }
          var exts = GLctx.getSupportedExtensions() || []
          ret = 2 * exts.length
          break
        case 33307:
        case 33308:
          if (GL.currentContext.version < 2) {
            GL.recordError(1280)
            return
          }
          ret = name_ == 33307 ? 3 : 0
          break
      }
      if (ret === undefined) {
        var result = GLctx.getParameter(name_)
        switch (typeof result) {
          case 'number':
            ret = result
            break
          case 'boolean':
            ret = result ? 1 : 0
            break
          case 'string':
            GL.recordError(1280)
            return
          case 'object':
            if (result === null) {
              switch (name_) {
                case 34964:
                case 35725:
                case 34965:
                case 36006:
                case 36007:
                case 32873:
                case 34229:
                case 35097:
                case 36389:
                case 34068: {
                  ret = 0
                  break
                }
                default: {
                  GL.recordError(1280)
                  return
                }
              }
            } else if (
              result instanceof Float32Array ||
              result instanceof Uint32Array ||
              result instanceof Int32Array ||
              result instanceof Array
            ) {
              for (var i = 0; i < result.length; ++i) {
                switch (type) {
                  case 0:
                    HEAP32[(p + i * 4) >> 2] = result[i]
                    break
                  case 2:
                    HEAPF32[(p + i * 4) >> 2] = result[i]
                    break
                  case 4:
                    HEAP8[(p + i) >> 0] = result[i] ? 1 : 0
                    break
                }
              }
              return
            } else {
              try {
                ret = result.name | 0
              } catch (e) {
                GL.recordError(1280)
                err(
                  'GL_INVALID_ENUM in glGet' +
                    type +
                    'v: Unknown object returned from WebGL getParameter(' +
                    name_ +
                    ')! (error: ' +
                    e +
                    ')'
                )
                return
              }
            }
            break
          default:
            GL.recordError(1280)
            err(
              'GL_INVALID_ENUM in glGet' +
                type +
                'v: Native code calling glGet' +
                type +
                'v(' +
                name_ +
                ') and it returns ' +
                result +
                ' of type ' +
                typeof result +
                '!'
            )
            return
        }
      }
      switch (type) {
        case 1:
          writeI53ToI64(p, ret)
          break
        case 0:
          HEAP32[p >> 2] = ret
          break
        case 2:
          HEAPF32[p >> 2] = ret
          break
        case 4:
          HEAP8[p >> 0] = ret ? 1 : 0
          break
      }
    }
    function _emscripten_glGetBooleanv(name_, p) {
      emscriptenWebGLGet(name_, p, 4)
    }
    function _emscripten_glGetBufferParameteri64v(target, value, data) {
      if (!data) {
        GL.recordError(1281)
        return
      }
      writeI53ToI64(data, GLctx.getBufferParameter(target, value))
    }
    function _emscripten_glGetBufferParameteriv(target, value, data) {
      if (!data) {
        GL.recordError(1281)
        return
      }
      HEAP32[data >> 2] = GLctx.getBufferParameter(target, value)
    }
    function _emscripten_glGetError() {
      var error = GLctx.getError() || GL.lastError
      GL.lastError = 0
      return error
    }
    function _emscripten_glGetFloatv(name_, p) {
      emscriptenWebGLGet(name_, p, 2)
    }
    function _emscripten_glGetFragDataLocation(program, name) {
      return GLctx['getFragDataLocation'](GL.programs[program], UTF8ToString(name))
    }
    function _emscripten_glGetFramebufferAttachmentParameteriv(target, attachment, pname, params) {
      var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname)
      if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) {
        result = result.name | 0
      }
      HEAP32[params >> 2] = result
    }
    function emscriptenWebGLGetIndexed(target, index, data, type) {
      if (!data) {
        GL.recordError(1281)
        return
      }
      var result = GLctx['getIndexedParameter'](target, index)
      var ret
      switch (typeof result) {
        case 'boolean':
          ret = result ? 1 : 0
          break
        case 'number':
          ret = result
          break
        case 'object':
          if (result === null) {
            switch (target) {
              case 35983:
              case 35368:
                ret = 0
                break
              default: {
                GL.recordError(1280)
                return
              }
            }
          } else if (result instanceof WebGLBuffer) {
            ret = result.name | 0
          } else {
            GL.recordError(1280)
            return
          }
          break
        default:
          GL.recordError(1280)
          return
      }
      switch (type) {
        case 1:
          writeI53ToI64(data, ret)
          break
        case 0:
          HEAP32[data >> 2] = ret
          break
        case 2:
          HEAPF32[data >> 2] = ret
          break
        case 4:
          HEAP8[data >> 0] = ret ? 1 : 0
          break
        default:
          throw 'internal emscriptenWebGLGetIndexed() error, bad type: ' + type
      }
    }
    function _emscripten_glGetInteger64i_v(target, index, data) {
      emscriptenWebGLGetIndexed(target, index, data, 1)
    }
    function _emscripten_glGetInteger64v(name_, p) {
      emscriptenWebGLGet(name_, p, 1)
    }
    function _emscripten_glGetIntegeri_v(target, index, data) {
      emscriptenWebGLGetIndexed(target, index, data, 0)
    }
    function _emscripten_glGetIntegerv(name_, p) {
      emscriptenWebGLGet(name_, p, 0)
    }
    function _emscripten_glGetInternalformativ(target, internalformat, pname, bufSize, params) {
      if (bufSize < 0) {
        GL.recordError(1281)
        return
      }
      if (!params) {
        GL.recordError(1281)
        return
      }
      var ret = GLctx['getInternalformatParameter'](target, internalformat, pname)
      if (ret === null) return
      for (var i = 0; i < ret.length && i < bufSize; ++i) {
        HEAP32[(params + i) >> 2] = ret[i]
      }
    }
    function _emscripten_glGetProgramBinary(program, bufSize, length, binaryFormat, binary) {
      GL.recordError(1282)
    }
    function _emscripten_glGetProgramInfoLog(program, maxLength, length, infoLog) {
      var log = GLctx.getProgramInfoLog(GL.programs[program])
      if (log === null) log = '(unknown error)'
      var numBytesWrittenExclNull =
        maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0
      if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
    }
    function _emscripten_glGetProgramiv(program, pname, p) {
      if (!p) {
        GL.recordError(1281)
        return
      }
      if (program >= GL.counter) {
        GL.recordError(1281)
        return
      }
      var ptable = GL.programInfos[program]
      if (!ptable) {
        GL.recordError(1282)
        return
      }
      if (pname == 35716) {
        var log = GLctx.getProgramInfoLog(GL.programs[program])
        if (log === null) log = '(unknown error)'
        HEAP32[p >> 2] = log.length + 1
      } else if (pname == 35719) {
        HEAP32[p >> 2] = ptable.maxUniformLength
      } else if (pname == 35722) {
        if (ptable.maxAttributeLength == -1) {
          program = GL.programs[program]
          var numAttribs = GLctx.getProgramParameter(program, 35721)
          ptable.maxAttributeLength = 0
          for (var i = 0; i < numAttribs; ++i) {
            var activeAttrib = GLctx.getActiveAttrib(program, i)
            ptable.maxAttributeLength = Math.max(
              ptable.maxAttributeLength,
              activeAttrib.name.length + 1
            )
          }
        }
        HEAP32[p >> 2] = ptable.maxAttributeLength
      } else if (pname == 35381) {
        if (ptable.maxUniformBlockNameLength == -1) {
          program = GL.programs[program]
          var numBlocks = GLctx.getProgramParameter(program, 35382)
          ptable.maxUniformBlockNameLength = 0
          for (var i = 0; i < numBlocks; ++i) {
            var activeBlockName = GLctx.getActiveUniformBlockName(program, i)
            ptable.maxUniformBlockNameLength = Math.max(
              ptable.maxUniformBlockNameLength,
              activeBlockName.length + 1
            )
          }
        }
        HEAP32[p >> 2] = ptable.maxUniformBlockNameLength
      } else {
        HEAP32[p >> 2] = GLctx.getProgramParameter(GL.programs[program], pname)
      }
    }
    function _emscripten_glGetQueryObjecti64vEXT(id, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      var query = GL.timerQueriesEXT[id]
      var param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname)
      var ret
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0
      } else {
        ret = param
      }
      writeI53ToI64(params, ret)
    }
    function _emscripten_glGetQueryObjectivEXT(id, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      var query = GL.timerQueriesEXT[id]
      var param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname)
      var ret
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0
      } else {
        ret = param
      }
      HEAP32[params >> 2] = ret
    }
    function _emscripten_glGetQueryObjectui64vEXT(id, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      var query = GL.timerQueriesEXT[id]
      var param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname)
      var ret
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0
      } else {
        ret = param
      }
      writeI53ToI64(params, ret)
    }
    function _emscripten_glGetQueryObjectuiv(id, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      var query = GL.queries[id]
      var param = GLctx['getQueryParameter'](query, pname)
      var ret
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0
      } else {
        ret = param
      }
      HEAP32[params >> 2] = ret
    }
    function _emscripten_glGetQueryObjectuivEXT(id, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      var query = GL.timerQueriesEXT[id]
      var param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname)
      var ret
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0
      } else {
        ret = param
      }
      HEAP32[params >> 2] = ret
    }
    function _emscripten_glGetQueryiv(target, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      HEAP32[params >> 2] = GLctx['getQuery'](target, pname)
    }
    function _emscripten_glGetQueryivEXT(target, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      HEAP32[params >> 2] = GLctx.disjointTimerQueryExt['getQueryEXT'](target, pname)
    }
    function _emscripten_glGetRenderbufferParameteriv(target, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      HEAP32[params >> 2] = GLctx.getRenderbufferParameter(target, pname)
    }
    function _emscripten_glGetSamplerParameterfv(sampler, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      sampler = GL.samplers[sampler]
      HEAPF32[params >> 2] = GLctx['getSamplerParameter'](sampler, pname)
    }
    function _emscripten_glGetSamplerParameteriv(sampler, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      sampler = GL.samplers[sampler]
      HEAP32[params >> 2] = GLctx['getSamplerParameter'](sampler, pname)
    }
    function _emscripten_glGetShaderInfoLog(shader, maxLength, length, infoLog) {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader])
      if (log === null) log = '(unknown error)'
      var numBytesWrittenExclNull =
        maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0
      if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
    }
    function _emscripten_glGetShaderPrecisionFormat(shaderType, precisionType, range, precision) {
      var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType)
      HEAP32[range >> 2] = result.rangeMin
      HEAP32[(range + 4) >> 2] = result.rangeMax
      HEAP32[precision >> 2] = result.precision
    }
    function _emscripten_glGetShaderSource(shader, bufSize, length, source) {
      var result = GLctx.getShaderSource(GL.shaders[shader])
      if (!result) return
      var numBytesWrittenExclNull =
        bufSize > 0 && source ? stringToUTF8(result, source, bufSize) : 0
      if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
    }
    function _emscripten_glGetShaderiv(shader, pname, p) {
      if (!p) {
        GL.recordError(1281)
        return
      }
      if (pname == 35716) {
        var log = GLctx.getShaderInfoLog(GL.shaders[shader])
        if (log === null) log = '(unknown error)'
        HEAP32[p >> 2] = log.length + 1
      } else if (pname == 35720) {
        var source = GLctx.getShaderSource(GL.shaders[shader])
        var sourceLength = source === null || source.length == 0 ? 0 : source.length + 1
        HEAP32[p >> 2] = sourceLength
      } else {
        HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname)
      }
    }
    function stringToNewUTF8(jsString) {
      var length = lengthBytesUTF8(jsString) + 1
      var cString = _malloc(length)
      stringToUTF8(jsString, cString, length)
      return cString
    }
    function _emscripten_glGetString(name_) {
      if (GL.stringCache[name_]) return GL.stringCache[name_]
      var ret
      switch (name_) {
        case 7939:
          var exts = GLctx.getSupportedExtensions() || []
          exts = exts.concat(
            exts.map(function (e) {
              return 'GL_' + e
            })
          )
          ret = stringToNewUTF8(exts.join(' '))
          break
        case 7936:
        case 7937:
        case 37445:
        case 37446:
          var s = GLctx.getParameter(name_)
          if (!s) {
            GL.recordError(1280)
          }
          ret = stringToNewUTF8(s)
          break
        case 7938:
          var glVersion = GLctx.getParameter(7938)
          if (GL.currentContext.version >= 2) glVersion = 'OpenGL ES 3.0 (' + glVersion + ')'
          else {
            glVersion = 'OpenGL ES 2.0 (' + glVersion + ')'
          }
          ret = stringToNewUTF8(glVersion)
          break
        case 35724:
          var glslVersion = GLctx.getParameter(35724)
          var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/
          var ver_num = glslVersion.match(ver_re)
          if (ver_num !== null) {
            if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + '0'
            glslVersion = 'OpenGL ES GLSL ES ' + ver_num[1] + ' (' + glslVersion + ')'
          }
          ret = stringToNewUTF8(glslVersion)
          break
        default:
          GL.recordError(1280)
          return 0
      }
      GL.stringCache[name_] = ret
      return ret
    }
    function _emscripten_glGetStringi(name, index) {
      if (GL.currentContext.version < 2) {
        GL.recordError(1282)
        return 0
      }
      var stringiCache = GL.stringiCache[name]
      if (stringiCache) {
        if (index < 0 || index >= stringiCache.length) {
          GL.recordError(1281)
          return 0
        }
        return stringiCache[index]
      }
      switch (name) {
        case 7939:
          var exts = GLctx.getSupportedExtensions() || []
          exts = exts.concat(
            exts.map(function (e) {
              return 'GL_' + e
            })
          )
          exts = exts.map(function (e) {
            return stringToNewUTF8(e)
          })
          stringiCache = GL.stringiCache[name] = exts
          if (index < 0 || index >= stringiCache.length) {
            GL.recordError(1281)
            return 0
          }
          return stringiCache[index]
        default:
          GL.recordError(1280)
          return 0
      }
    }
    function _emscripten_glGetSynciv(sync, pname, bufSize, length, values) {
      if (bufSize < 0) {
        GL.recordError(1281)
        return
      }
      if (!values) {
        GL.recordError(1281)
        return
      }
      var ret = GLctx.getSyncParameter(GL.syncs[sync], pname)
      HEAP32[length >> 2] = ret
      if (ret !== null && length) HEAP32[length >> 2] = 1
    }
    function _emscripten_glGetTexParameterfv(target, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      HEAPF32[params >> 2] = GLctx.getTexParameter(target, pname)
    }
    function _emscripten_glGetTexParameteriv(target, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      HEAP32[params >> 2] = GLctx.getTexParameter(target, pname)
    }
    function _emscripten_glGetTransformFeedbackVarying(
      program,
      index,
      bufSize,
      length,
      size,
      type,
      name
    ) {
      program = GL.programs[program]
      var info = GLctx['getTransformFeedbackVarying'](program, index)
      if (!info) return
      if (name && bufSize > 0) {
        var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize)
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
      } else {
        if (length) HEAP32[length >> 2] = 0
      }
      if (size) HEAP32[size >> 2] = info.size
      if (type) HEAP32[type >> 2] = info.type
    }
    function _emscripten_glGetUniformBlockIndex(program, uniformBlockName) {
      return GLctx['getUniformBlockIndex'](GL.programs[program], UTF8ToString(uniformBlockName))
    }
    function _emscripten_glGetUniformIndices(program, uniformCount, uniformNames, uniformIndices) {
      if (!uniformIndices) {
        GL.recordError(1281)
        return
      }
      if (uniformCount > 0 && (uniformNames == 0 || uniformIndices == 0)) {
        GL.recordError(1281)
        return
      }
      program = GL.programs[program]
      var names = []
      for (var i = 0; i < uniformCount; i++)
        names.push(UTF8ToString(HEAP32[(uniformNames + i * 4) >> 2]))
      var result = GLctx['getUniformIndices'](program, names)
      if (!result) return
      var len = result.length
      for (var i = 0; i < len; i++) {
        HEAP32[(uniformIndices + i * 4) >> 2] = result[i]
      }
    }
    function _emscripten_glGetUniformLocation(program, name) {
      name = UTF8ToString(name)
      var arrayIndex = 0
      if (name[name.length - 1] == ']') {
        var leftBrace = name.lastIndexOf('[')
        arrayIndex = name[leftBrace + 1] != ']' ? jstoi_q(name.slice(leftBrace + 1)) : 0
        name = name.slice(0, leftBrace)
      }
      var uniformInfo = GL.programInfos[program] && GL.programInfos[program].uniforms[name]
      if (uniformInfo && arrayIndex >= 0 && arrayIndex < uniformInfo[0]) {
        return uniformInfo[1] + arrayIndex
      } else {
        return -1
      }
    }
    function emscriptenWebGLGetUniform(program, location, params, type) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      var data = GLctx.getUniform(GL.programs[program], GL.uniforms[location])
      if (typeof data == 'number' || typeof data == 'boolean') {
        switch (type) {
          case 0:
            HEAP32[params >> 2] = data
            break
          case 2:
            HEAPF32[params >> 2] = data
            break
          default:
            throw 'internal emscriptenWebGLGetUniform() error, bad type: ' + type
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          switch (type) {
            case 0:
              HEAP32[(params + i * 4) >> 2] = data[i]
              break
            case 2:
              HEAPF32[(params + i * 4) >> 2] = data[i]
              break
            default:
              throw 'internal emscriptenWebGLGetUniform() error, bad type: ' + type
          }
        }
      }
    }
    function _emscripten_glGetUniformfv(program, location, params) {
      emscriptenWebGLGetUniform(program, location, params, 2)
    }
    function _emscripten_glGetUniformiv(program, location, params) {
      emscriptenWebGLGetUniform(program, location, params, 0)
    }
    function _emscripten_glGetUniformuiv(program, location, params) {
      emscriptenWebGLGetUniform(program, location, params, 0)
    }
    function emscriptenWebGLGetVertexAttrib(index, pname, params, type) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      var data = GLctx.getVertexAttrib(index, pname)
      if (pname == 34975) {
        HEAP32[params >> 2] = data['name']
      } else if (typeof data == 'number' || typeof data == 'boolean') {
        switch (type) {
          case 0:
            HEAP32[params >> 2] = data
            break
          case 2:
            HEAPF32[params >> 2] = data
            break
          case 5:
            HEAP32[params >> 2] = Math.fround(data)
            break
          default:
            throw 'internal emscriptenWebGLGetVertexAttrib() error, bad type: ' + type
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          switch (type) {
            case 0:
              HEAP32[(params + i * 4) >> 2] = data[i]
              break
            case 2:
              HEAPF32[(params + i * 4) >> 2] = data[i]
              break
            case 5:
              HEAP32[(params + i * 4) >> 2] = Math.fround(data[i])
              break
            default:
              throw 'internal emscriptenWebGLGetVertexAttrib() error, bad type: ' + type
          }
        }
      }
    }
    function _emscripten_glGetVertexAttribIiv(index, pname, params) {
      emscriptenWebGLGetVertexAttrib(index, pname, params, 0)
    }
    function _emscripten_glGetVertexAttribIuiv(index, pname, params) {
      emscriptenWebGLGetVertexAttrib(index, pname, params, 0)
    }
    function _emscripten_glGetVertexAttribPointerv(index, pname, pointer) {
      if (!pointer) {
        GL.recordError(1281)
        return
      }
      HEAP32[pointer >> 2] = GLctx.getVertexAttribOffset(index, pname)
    }
    function _emscripten_glGetVertexAttribfv(index, pname, params) {
      emscriptenWebGLGetVertexAttrib(index, pname, params, 2)
    }
    function _emscripten_glGetVertexAttribiv(index, pname, params) {
      emscriptenWebGLGetVertexAttrib(index, pname, params, 5)
    }
    function _emscripten_glHint(x0, x1) {
      GLctx['hint'](x0, x1)
    }
    function _emscripten_glInvalidateFramebuffer(target, numAttachments, attachments) {
      var list = __tempFixedLengthArray[numAttachments]
      for (var i = 0; i < numAttachments; i++) {
        list[i] = HEAP32[(attachments + i * 4) >> 2]
      }
      GLctx['invalidateFramebuffer'](target, list)
    }
    function _emscripten_glInvalidateSubFramebuffer(
      target,
      numAttachments,
      attachments,
      x,
      y,
      width,
      height
    ) {
      var list = __tempFixedLengthArray[numAttachments]
      for (var i = 0; i < numAttachments; i++) {
        list[i] = HEAP32[(attachments + i * 4) >> 2]
      }
      GLctx['invalidateSubFramebuffer'](target, list, x, y, width, height)
    }
    function _emscripten_glIsBuffer(buffer) {
      var b = GL.buffers[buffer]
      if (!b) return 0
      return GLctx.isBuffer(b)
    }
    function _emscripten_glIsEnabled(x0) {
      return GLctx['isEnabled'](x0)
    }
    function _emscripten_glIsFramebuffer(framebuffer) {
      var fb = GL.framebuffers[framebuffer]
      if (!fb) return 0
      return GLctx.isFramebuffer(fb)
    }
    function _emscripten_glIsProgram(program) {
      program = GL.programs[program]
      if (!program) return 0
      return GLctx.isProgram(program)
    }
    function _emscripten_glIsQuery(id) {
      var query = GL.queries[id]
      if (!query) return 0
      return GLctx['isQuery'](query)
    }
    function _emscripten_glIsQueryEXT(id) {
      var query = GL.timerQueriesEXT[id]
      if (!query) return 0
      return GLctx.disjointTimerQueryExt['isQueryEXT'](query)
    }
    function _emscripten_glIsRenderbuffer(renderbuffer) {
      var rb = GL.renderbuffers[renderbuffer]
      if (!rb) return 0
      return GLctx.isRenderbuffer(rb)
    }
    function _emscripten_glIsSampler(id) {
      var sampler = GL.samplers[id]
      if (!sampler) return 0
      return GLctx['isSampler'](sampler)
    }
    function _emscripten_glIsShader(shader) {
      var s = GL.shaders[shader]
      if (!s) return 0
      return GLctx.isShader(s)
    }
    function _emscripten_glIsSync(sync) {
      return GLctx.isSync(GL.syncs[sync])
    }
    function _emscripten_glIsTexture(id) {
      var texture = GL.textures[id]
      if (!texture) return 0
      return GLctx.isTexture(texture)
    }
    function _emscripten_glIsTransformFeedback(id) {
      return GLctx['isTransformFeedback'](GL.transformFeedbacks[id])
    }
    function _emscripten_glIsVertexArray(array) {
      var vao = GL.vaos[array]
      if (!vao) return 0
      return GLctx['isVertexArray'](vao)
    }
    function _emscripten_glIsVertexArrayOES(array) {
      var vao = GL.vaos[array]
      if (!vao) return 0
      return GLctx['isVertexArray'](vao)
    }
    function _emscripten_glLineWidth(x0) {
      GLctx['lineWidth'](x0)
    }
    function _emscripten_glLinkProgram(program) {
      GLctx.linkProgram(GL.programs[program])
      GL.populateUniformTable(program)
    }
    function _emscripten_glPauseTransformFeedback() {
      GLctx['pauseTransformFeedback']()
    }
    function _emscripten_glPixelStorei(pname, param) {
      if (pname == 3317) {
        GL.unpackAlignment = param
      }
      GLctx.pixelStorei(pname, param)
    }
    function _emscripten_glPolygonOffset(x0, x1) {
      GLctx['polygonOffset'](x0, x1)
    }
    function _emscripten_glProgramBinary(program, binaryFormat, binary, length) {
      GL.recordError(1280)
    }
    function _emscripten_glProgramParameteri(program, pname, value) {
      GL.recordError(1280)
    }
    function _emscripten_glQueryCounterEXT(id, target) {
      GLctx.disjointTimerQueryExt['queryCounterEXT'](GL.timerQueriesEXT[id], target)
    }
    function _emscripten_glReadBuffer(x0) {
      GLctx['readBuffer'](x0)
    }
    function __computeUnpackAlignedImageSize(width, height, sizePerPixel, alignment) {
      function roundedToNextMultipleOf(x, y) {
        return (x + y - 1) & -y
      }
      var plainRowSize = width * sizePerPixel
      var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment)
      return height * alignedRowSize
    }
    function __colorChannelsInGlTextureFormat(format) {
      var colorChannels = {
        5: 3,
        6: 4,
        8: 2,
        29502: 3,
        29504: 4,
        26917: 2,
        26918: 2,
        29846: 3,
        29847: 4
      }
      return colorChannels[format - 6402] || 1
    }
    function __heapObjectForWebGLType(type) {
      type -= 5120
      if (type == 0) return HEAP8
      if (type == 1) return HEAPU8
      if (type == 2) return HEAP16
      if (type == 4) return HEAP32
      if (type == 6) return HEAPF32
      if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782)
        return HEAPU32
      return HEAPU16
    }
    function __heapAccessShiftForWebGLHeap(heap) {
      return 31 - Math.clz32(heap.BYTES_PER_ELEMENT)
    }
    function emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) {
      var heap = __heapObjectForWebGLType(type)
      var shift = __heapAccessShiftForWebGLHeap(heap)
      var byteSize = 1 << shift
      var sizePerPixel = __colorChannelsInGlTextureFormat(format) * byteSize
      var bytes = __computeUnpackAlignedImageSize(width, height, sizePerPixel, GL.unpackAlignment)
      return heap.subarray(pixels >> shift, (pixels + bytes) >> shift)
    }
    function _emscripten_glReadPixels(x, y, width, height, format, type, pixels) {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelPackBufferBinding) {
          GLctx.readPixels(x, y, width, height, format, type, pixels)
        } else {
          var heap = __heapObjectForWebGLType(type)
          GLctx.readPixels(
            x,
            y,
            width,
            height,
            format,
            type,
            heap,
            pixels >> __heapAccessShiftForWebGLHeap(heap)
          )
        }
        return
      }
      var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format)
      if (!pixelData) {
        GL.recordError(1280)
        return
      }
      GLctx.readPixels(x, y, width, height, format, type, pixelData)
    }
    function _emscripten_glReleaseShaderCompiler() {}
    function _emscripten_glRenderbufferStorage(x0, x1, x2, x3) {
      GLctx['renderbufferStorage'](x0, x1, x2, x3)
    }
    function _emscripten_glRenderbufferStorageMultisample(x0, x1, x2, x3, x4) {
      GLctx['renderbufferStorageMultisample'](x0, x1, x2, x3, x4)
    }
    function _emscripten_glResumeTransformFeedback() {
      GLctx['resumeTransformFeedback']()
    }
    function _emscripten_glSampleCoverage(value, invert) {
      GLctx.sampleCoverage(value, !!invert)
    }
    function _emscripten_glSamplerParameterf(sampler, pname, param) {
      GLctx['samplerParameterf'](GL.samplers[sampler], pname, param)
    }
    function _emscripten_glSamplerParameterfv(sampler, pname, params) {
      var param = HEAPF32[params >> 2]
      GLctx['samplerParameterf'](GL.samplers[sampler], pname, param)
    }
    function _emscripten_glSamplerParameteri(sampler, pname, param) {
      GLctx['samplerParameteri'](GL.samplers[sampler], pname, param)
    }
    function _emscripten_glSamplerParameteriv(sampler, pname, params) {
      var param = HEAP32[params >> 2]
      GLctx['samplerParameteri'](GL.samplers[sampler], pname, param)
    }
    function _emscripten_glScissor(x0, x1, x2, x3) {
      GLctx['scissor'](x0, x1, x2, x3)
    }
    function _emscripten_glShaderBinary() {
      GL.recordError(1280)
    }
    function _emscripten_glShaderSource(shader, count, string, length) {
      var source = GL.getSource(shader, count, string, length)
      GLctx.shaderSource(GL.shaders[shader], source)
    }
    function _emscripten_glStencilFunc(x0, x1, x2) {
      GLctx['stencilFunc'](x0, x1, x2)
    }
    function _emscripten_glStencilFuncSeparate(x0, x1, x2, x3) {
      GLctx['stencilFuncSeparate'](x0, x1, x2, x3)
    }
    function _emscripten_glStencilMask(x0) {
      GLctx['stencilMask'](x0)
    }
    function _emscripten_glStencilMaskSeparate(x0, x1) {
      GLctx['stencilMaskSeparate'](x0, x1)
    }
    function _emscripten_glStencilOp(x0, x1, x2) {
      GLctx['stencilOp'](x0, x1, x2)
    }
    function _emscripten_glStencilOpSeparate(x0, x1, x2, x3) {
      GLctx['stencilOpSeparate'](x0, x1, x2, x3)
    }
    function _emscripten_glTexImage2D(
      target,
      level,
      internalFormat,
      width,
      height,
      border,
      format,
      type,
      pixels
    ) {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texImage2D(
            target,
            level,
            internalFormat,
            width,
            height,
            border,
            format,
            type,
            pixels
          )
        } else if (pixels) {
          var heap = __heapObjectForWebGLType(type)
          GLctx.texImage2D(
            target,
            level,
            internalFormat,
            width,
            height,
            border,
            format,
            type,
            heap,
            pixels >> __heapAccessShiftForWebGLHeap(heap)
          )
        } else {
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, null)
        }
        return
      }
      GLctx.texImage2D(
        target,
        level,
        internalFormat,
        width,
        height,
        border,
        format,
        type,
        pixels
          ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat)
          : null
      )
    }
    function _emscripten_glTexImage3D(
      target,
      level,
      internalFormat,
      width,
      height,
      depth,
      border,
      format,
      type,
      pixels
    ) {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx['texImage3D'](
          target,
          level,
          internalFormat,
          width,
          height,
          depth,
          border,
          format,
          type,
          pixels
        )
      } else if (pixels) {
        var heap = __heapObjectForWebGLType(type)
        GLctx['texImage3D'](
          target,
          level,
          internalFormat,
          width,
          height,
          depth,
          border,
          format,
          type,
          heap,
          pixels >> __heapAccessShiftForWebGLHeap(heap)
        )
      } else {
        GLctx['texImage3D'](
          target,
          level,
          internalFormat,
          width,
          height,
          depth,
          border,
          format,
          type,
          null
        )
      }
    }
    function _emscripten_glTexParameterf(x0, x1, x2) {
      GLctx['texParameterf'](x0, x1, x2)
    }
    function _emscripten_glTexParameterfv(target, pname, params) {
      var param = HEAPF32[params >> 2]
      GLctx.texParameterf(target, pname, param)
    }
    function _emscripten_glTexParameteri(x0, x1, x2) {
      GLctx['texParameteri'](x0, x1, x2)
    }
    function _emscripten_glTexParameteriv(target, pname, params) {
      var param = HEAP32[params >> 2]
      GLctx.texParameteri(target, pname, param)
    }
    function _emscripten_glTexStorage2D(x0, x1, x2, x3, x4) {
      GLctx['texStorage2D'](x0, x1, x2, x3, x4)
    }
    function _emscripten_glTexStorage3D(x0, x1, x2, x3, x4, x5) {
      GLctx['texStorage3D'](x0, x1, x2, x3, x4, x5)
    }
    function _emscripten_glTexSubImage2D(
      target,
      level,
      xoffset,
      yoffset,
      width,
      height,
      format,
      type,
      pixels
    ) {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels)
        } else if (pixels) {
          var heap = __heapObjectForWebGLType(type)
          GLctx.texSubImage2D(
            target,
            level,
            xoffset,
            yoffset,
            width,
            height,
            format,
            type,
            heap,
            pixels >> __heapAccessShiftForWebGLHeap(heap)
          )
        } else {
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, null)
        }
        return
      }
      var pixelData = null
      if (pixels) pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0)
      GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData)
    }
    function _emscripten_glTexSubImage3D(
      target,
      level,
      xoffset,
      yoffset,
      zoffset,
      width,
      height,
      depth,
      format,
      type,
      pixels
    ) {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx['texSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          type,
          pixels
        )
      } else if (pixels) {
        var heap = __heapObjectForWebGLType(type)
        GLctx['texSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          type,
          heap,
          pixels >> __heapAccessShiftForWebGLHeap(heap)
        )
      } else {
        GLctx['texSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          type,
          null
        )
      }
    }
    function _emscripten_glTransformFeedbackVaryings(program, count, varyings, bufferMode) {
      program = GL.programs[program]
      var vars = []
      for (var i = 0; i < count; i++) vars.push(UTF8ToString(HEAP32[(varyings + i * 4) >> 2]))
      GLctx['transformFeedbackVaryings'](program, vars, bufferMode)
    }
    function _emscripten_glUniform1f(location, v0) {
      GLctx.uniform1f(GL.uniforms[location], v0)
    }
    function _emscripten_glUniform1fv(location, count, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniform1fv(GL.uniforms[location], HEAPF32, value >> 2, count)
        return
      }
      if (count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferFloatViews[count - 1]
        for (var i = 0; i < count; ++i) {
          view[i] = HEAPF32[(value + 4 * i) >> 2]
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 4) >> 2)
      }
      GLctx.uniform1fv(GL.uniforms[location], view)
    }
    function _emscripten_glUniform1i(location, v0) {
      GLctx.uniform1i(GL.uniforms[location], v0)
    }
    function _emscripten_glUniform1iv(location, count, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniform1iv(GL.uniforms[location], HEAP32, value >> 2, count)
        return
      }
      if (count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferIntViews[count - 1]
        for (var i = 0; i < count; ++i) {
          view[i] = HEAP32[(value + 4 * i) >> 2]
        }
      } else {
        var view = HEAP32.subarray(value >> 2, (value + count * 4) >> 2)
      }
      GLctx.uniform1iv(GL.uniforms[location], view)
    }
    function _emscripten_glUniform1ui(location, v0) {
      GLctx.uniform1ui(GL.uniforms[location], v0)
    }
    function _emscripten_glUniform1uiv(location, count, value) {
      GLctx.uniform1uiv(GL.uniforms[location], HEAPU32, value >> 2, count)
    }
    function _emscripten_glUniform2f(location, v0, v1) {
      GLctx.uniform2f(GL.uniforms[location], v0, v1)
    }
    function _emscripten_glUniform2fv(location, count, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniform2fv(GL.uniforms[location], HEAPF32, value >> 2, count * 2)
        return
      }
      if (2 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferFloatViews[2 * count - 1]
        for (var i = 0; i < 2 * count; i += 2) {
          view[i] = HEAPF32[(value + 4 * i) >> 2]
          view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 8) >> 2)
      }
      GLctx.uniform2fv(GL.uniforms[location], view)
    }
    function _emscripten_glUniform2i(location, v0, v1) {
      GLctx.uniform2i(GL.uniforms[location], v0, v1)
    }
    function _emscripten_glUniform2iv(location, count, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniform2iv(GL.uniforms[location], HEAP32, value >> 2, count * 2)
        return
      }
      if (2 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferIntViews[2 * count - 1]
        for (var i = 0; i < 2 * count; i += 2) {
          view[i] = HEAP32[(value + 4 * i) >> 2]
          view[i + 1] = HEAP32[(value + (4 * i + 4)) >> 2]
        }
      } else {
        var view = HEAP32.subarray(value >> 2, (value + count * 8) >> 2)
      }
      GLctx.uniform2iv(GL.uniforms[location], view)
    }
    function _emscripten_glUniform2ui(location, v0, v1) {
      GLctx.uniform2ui(GL.uniforms[location], v0, v1)
    }
    function _emscripten_glUniform2uiv(location, count, value) {
      GLctx.uniform2uiv(GL.uniforms[location], HEAPU32, value >> 2, count * 2)
    }
    function _emscripten_glUniform3f(location, v0, v1, v2) {
      GLctx.uniform3f(GL.uniforms[location], v0, v1, v2)
    }
    function _emscripten_glUniform3fv(location, count, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniform3fv(GL.uniforms[location], HEAPF32, value >> 2, count * 3)
        return
      }
      if (3 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferFloatViews[3 * count - 1]
        for (var i = 0; i < 3 * count; i += 3) {
          view[i] = HEAPF32[(value + 4 * i) >> 2]
          view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
          view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2]
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 12) >> 2)
      }
      GLctx.uniform3fv(GL.uniforms[location], view)
    }
    function _emscripten_glUniform3i(location, v0, v1, v2) {
      GLctx.uniform3i(GL.uniforms[location], v0, v1, v2)
    }
    function _emscripten_glUniform3iv(location, count, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniform3iv(GL.uniforms[location], HEAP32, value >> 2, count * 3)
        return
      }
      if (3 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferIntViews[3 * count - 1]
        for (var i = 0; i < 3 * count; i += 3) {
          view[i] = HEAP32[(value + 4 * i) >> 2]
          view[i + 1] = HEAP32[(value + (4 * i + 4)) >> 2]
          view[i + 2] = HEAP32[(value + (4 * i + 8)) >> 2]
        }
      } else {
        var view = HEAP32.subarray(value >> 2, (value + count * 12) >> 2)
      }
      GLctx.uniform3iv(GL.uniforms[location], view)
    }
    function _emscripten_glUniform3ui(location, v0, v1, v2) {
      GLctx.uniform3ui(GL.uniforms[location], v0, v1, v2)
    }
    function _emscripten_glUniform3uiv(location, count, value) {
      GLctx.uniform3uiv(GL.uniforms[location], HEAPU32, value >> 2, count * 3)
    }
    function _emscripten_glUniform4f(location, v0, v1, v2, v3) {
      GLctx.uniform4f(GL.uniforms[location], v0, v1, v2, v3)
    }
    function _emscripten_glUniform4fv(location, count, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniform4fv(GL.uniforms[location], HEAPF32, value >> 2, count * 4)
        return
      }
      if (4 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferFloatViews[4 * count - 1]
        for (var i = 0; i < 4 * count; i += 4) {
          view[i] = HEAPF32[(value + 4 * i) >> 2]
          view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
          view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2]
          view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2]
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 16) >> 2)
      }
      GLctx.uniform4fv(GL.uniforms[location], view)
    }
    function _emscripten_glUniform4i(location, v0, v1, v2, v3) {
      GLctx.uniform4i(GL.uniforms[location], v0, v1, v2, v3)
    }
    function _emscripten_glUniform4iv(location, count, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniform4iv(GL.uniforms[location], HEAP32, value >> 2, count * 4)
        return
      }
      if (4 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferIntViews[4 * count - 1]
        for (var i = 0; i < 4 * count; i += 4) {
          view[i] = HEAP32[(value + 4 * i) >> 2]
          view[i + 1] = HEAP32[(value + (4 * i + 4)) >> 2]
          view[i + 2] = HEAP32[(value + (4 * i + 8)) >> 2]
          view[i + 3] = HEAP32[(value + (4 * i + 12)) >> 2]
        }
      } else {
        var view = HEAP32.subarray(value >> 2, (value + count * 16) >> 2)
      }
      GLctx.uniform4iv(GL.uniforms[location], view)
    }
    function _emscripten_glUniform4ui(location, v0, v1, v2, v3) {
      GLctx.uniform4ui(GL.uniforms[location], v0, v1, v2, v3)
    }
    function _emscripten_glUniform4uiv(location, count, value) {
      GLctx.uniform4uiv(GL.uniforms[location], HEAPU32, value >> 2, count * 4)
    }
    function _emscripten_glUniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding) {
      program = GL.programs[program]
      GLctx['uniformBlockBinding'](program, uniformBlockIndex, uniformBlockBinding)
    }
    function _emscripten_glUniformMatrix2fv(location, count, transpose, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniformMatrix2fv(GL.uniforms[location], !!transpose, HEAPF32, value >> 2, count * 4)
        return
      }
      if (4 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferFloatViews[4 * count - 1]
        for (var i = 0; i < 4 * count; i += 4) {
          view[i] = HEAPF32[(value + 4 * i) >> 2]
          view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
          view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2]
          view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2]
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 16) >> 2)
      }
      GLctx.uniformMatrix2fv(GL.uniforms[location], !!transpose, view)
    }
    function _emscripten_glUniformMatrix2x3fv(location, count, transpose, value) {
      GLctx.uniformMatrix2x3fv(GL.uniforms[location], !!transpose, HEAPF32, value >> 2, count * 6)
    }
    function _emscripten_glUniformMatrix2x4fv(location, count, transpose, value) {
      GLctx.uniformMatrix2x4fv(GL.uniforms[location], !!transpose, HEAPF32, value >> 2, count * 8)
    }
    function _emscripten_glUniformMatrix3fv(location, count, transpose, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniformMatrix3fv(GL.uniforms[location], !!transpose, HEAPF32, value >> 2, count * 9)
        return
      }
      if (9 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferFloatViews[9 * count - 1]
        for (var i = 0; i < 9 * count; i += 9) {
          view[i] = HEAPF32[(value + 4 * i) >> 2]
          view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
          view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2]
          view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2]
          view[i + 4] = HEAPF32[(value + (4 * i + 16)) >> 2]
          view[i + 5] = HEAPF32[(value + (4 * i + 20)) >> 2]
          view[i + 6] = HEAPF32[(value + (4 * i + 24)) >> 2]
          view[i + 7] = HEAPF32[(value + (4 * i + 28)) >> 2]
          view[i + 8] = HEAPF32[(value + (4 * i + 32)) >> 2]
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 36) >> 2)
      }
      GLctx.uniformMatrix3fv(GL.uniforms[location], !!transpose, view)
    }
    function _emscripten_glUniformMatrix3x2fv(location, count, transpose, value) {
      GLctx.uniformMatrix3x2fv(GL.uniforms[location], !!transpose, HEAPF32, value >> 2, count * 6)
    }
    function _emscripten_glUniformMatrix3x4fv(location, count, transpose, value) {
      GLctx.uniformMatrix3x4fv(GL.uniforms[location], !!transpose, HEAPF32, value >> 2, count * 12)
    }
    function _emscripten_glUniformMatrix4fv(location, count, transpose, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniformMatrix4fv(GL.uniforms[location], !!transpose, HEAPF32, value >> 2, count * 16)
        return
      }
      if (16 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferFloatViews[16 * count - 1]
        for (var i = 0; i < 16 * count; i += 16) {
          view[i] = HEAPF32[(value + 4 * i) >> 2]
          view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
          view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2]
          view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2]
          view[i + 4] = HEAPF32[(value + (4 * i + 16)) >> 2]
          view[i + 5] = HEAPF32[(value + (4 * i + 20)) >> 2]
          view[i + 6] = HEAPF32[(value + (4 * i + 24)) >> 2]
          view[i + 7] = HEAPF32[(value + (4 * i + 28)) >> 2]
          view[i + 8] = HEAPF32[(value + (4 * i + 32)) >> 2]
          view[i + 9] = HEAPF32[(value + (4 * i + 36)) >> 2]
          view[i + 10] = HEAPF32[(value + (4 * i + 40)) >> 2]
          view[i + 11] = HEAPF32[(value + (4 * i + 44)) >> 2]
          view[i + 12] = HEAPF32[(value + (4 * i + 48)) >> 2]
          view[i + 13] = HEAPF32[(value + (4 * i + 52)) >> 2]
          view[i + 14] = HEAPF32[(value + (4 * i + 56)) >> 2]
          view[i + 15] = HEAPF32[(value + (4 * i + 60)) >> 2]
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 64) >> 2)
      }
      GLctx.uniformMatrix4fv(GL.uniforms[location], !!transpose, view)
    }
    function _emscripten_glUniformMatrix4x2fv(location, count, transpose, value) {
      GLctx.uniformMatrix4x2fv(GL.uniforms[location], !!transpose, HEAPF32, value >> 2, count * 8)
    }
    function _emscripten_glUniformMatrix4x3fv(location, count, transpose, value) {
      GLctx.uniformMatrix4x3fv(GL.uniforms[location], !!transpose, HEAPF32, value >> 2, count * 12)
    }
    function _emscripten_glUseProgram(program) {
      GLctx.useProgram(GL.programs[program])
    }
    function _emscripten_glValidateProgram(program) {
      GLctx.validateProgram(GL.programs[program])
    }
    function _emscripten_glVertexAttrib1f(x0, x1) {
      GLctx['vertexAttrib1f'](x0, x1)
    }
    function _emscripten_glVertexAttrib1fv(index, v) {
      GLctx.vertexAttrib1f(index, HEAPF32[v >> 2])
    }
    function _emscripten_glVertexAttrib2f(x0, x1, x2) {
      GLctx['vertexAttrib2f'](x0, x1, x2)
    }
    function _emscripten_glVertexAttrib2fv(index, v) {
      GLctx.vertexAttrib2f(index, HEAPF32[v >> 2], HEAPF32[(v + 4) >> 2])
    }
    function _emscripten_glVertexAttrib3f(x0, x1, x2, x3) {
      GLctx['vertexAttrib3f'](x0, x1, x2, x3)
    }
    function _emscripten_glVertexAttrib3fv(index, v) {
      GLctx.vertexAttrib3f(index, HEAPF32[v >> 2], HEAPF32[(v + 4) >> 2], HEAPF32[(v + 8) >> 2])
    }
    function _emscripten_glVertexAttrib4f(x0, x1, x2, x3, x4) {
      GLctx['vertexAttrib4f'](x0, x1, x2, x3, x4)
    }
    function _emscripten_glVertexAttrib4fv(index, v) {
      GLctx.vertexAttrib4f(
        index,
        HEAPF32[v >> 2],
        HEAPF32[(v + 4) >> 2],
        HEAPF32[(v + 8) >> 2],
        HEAPF32[(v + 12) >> 2]
      )
    }
    function _emscripten_glVertexAttribDivisor(index, divisor) {
      GLctx['vertexAttribDivisor'](index, divisor)
    }
    function _emscripten_glVertexAttribDivisorANGLE(index, divisor) {
      GLctx['vertexAttribDivisor'](index, divisor)
    }
    function _emscripten_glVertexAttribDivisorARB(index, divisor) {
      GLctx['vertexAttribDivisor'](index, divisor)
    }
    function _emscripten_glVertexAttribDivisorEXT(index, divisor) {
      GLctx['vertexAttribDivisor'](index, divisor)
    }
    function _emscripten_glVertexAttribDivisorNV(index, divisor) {
      GLctx['vertexAttribDivisor'](index, divisor)
    }
    function _emscripten_glVertexAttribI4i(x0, x1, x2, x3, x4) {
      GLctx['vertexAttribI4i'](x0, x1, x2, x3, x4)
    }
    function _emscripten_glVertexAttribI4iv(index, v) {
      GLctx.vertexAttribI4i(
        index,
        HEAP32[v >> 2],
        HEAP32[(v + 4) >> 2],
        HEAP32[(v + 8) >> 2],
        HEAP32[(v + 12) >> 2]
      )
    }
    function _emscripten_glVertexAttribI4ui(x0, x1, x2, x3, x4) {
      GLctx['vertexAttribI4ui'](x0, x1, x2, x3, x4)
    }
    function _emscripten_glVertexAttribI4uiv(index, v) {
      GLctx.vertexAttribI4ui(
        index,
        HEAPU32[v >> 2],
        HEAPU32[(v + 4) >> 2],
        HEAPU32[(v + 8) >> 2],
        HEAPU32[(v + 12) >> 2]
      )
    }
    function _emscripten_glVertexAttribIPointer(index, size, type, stride, ptr) {
      GLctx['vertexAttribIPointer'](index, size, type, stride, ptr)
    }
    function _emscripten_glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr)
    }
    function _emscripten_glViewport(x0, x1, x2, x3) {
      GLctx['viewport'](x0, x1, x2, x3)
    }
    function _emscripten_glWaitSync(sync, flags, timeoutLo, timeoutHi) {
      GLctx.waitSync(GL.syncs[sync], flags, convertI32PairToI53(timeoutLo, timeoutHi))
    }
    var setjmpId = 0
    function _saveSetjmp(env, label, table, size) {
      env = env | 0
      label = label | 0
      table = table | 0
      size = size | 0
      var i = 0
      setjmpId = (setjmpId + 1) | 0
      HEAP32[env >> 2] = setjmpId
      while ((i | 0) < (size | 0)) {
        if ((HEAP32[(table + (i << 3)) >> 2] | 0) == 0) {
          HEAP32[(table + (i << 3)) >> 2] = setjmpId
          HEAP32[(table + ((i << 3) + 4)) >> 2] = label
          HEAP32[(table + ((i << 3) + 8)) >> 2] = 0
          setTempRet0(size | 0)
          return table | 0
        }
        i = (i + 1) | 0
      }
      size = (size * 2) | 0
      table = _realloc(table | 0, (8 * ((size + 1) | 0)) | 0) | 0
      table = _saveSetjmp(env | 0, label | 0, table | 0, size | 0) | 0
      setTempRet0(size | 0)
      return table | 0
    }
    function _testSetjmp(id, table, size) {
      id = id | 0
      table = table | 0
      size = size | 0
      var i = 0,
        curr = 0
      while ((i | 0) < (size | 0)) {
        curr = HEAP32[(table + (i << 3)) >> 2] | 0
        if ((curr | 0) == 0) break
        if ((curr | 0) == (id | 0)) {
          return HEAP32[(table + ((i << 3) + 4)) >> 2] | 0
        }
        i = (i + 1) | 0
      }
      return 0
    }
    function _longjmp(env, value) {
      _setThrew(env, value || 1)
      throw 'longjmp'
    }
    function _emscripten_longjmp(env, value) {
      _longjmp(env, value)
    }
    function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num)
    }
    function emscripten_realloc_buffer(size) {
      try {
        wasmMemory.grow((size - buffer.byteLength + 65535) >> 16)
        updateGlobalBufferAndViews(wasmMemory.buffer)
        return 1
      } catch (e) {}
    }
    function _emscripten_resize_heap(requestedSize) {
      var oldSize = _emscripten_get_heap_size()
      var PAGE_MULTIPLE = 65536
      var maxHeapSize = 2147483648 - PAGE_MULTIPLE
      if (requestedSize > maxHeapSize) {
        return false
      }
      var minHeapSize = 16777216
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296)
        var newSize = Math.min(
          maxHeapSize,
          alignUp(Math.max(minHeapSize, requestedSize, overGrownHeapSize), PAGE_MULTIPLE)
        )
        var replacement = emscripten_realloc_buffer(newSize)
        if (replacement) {
          return true
        }
      }
      return false
    }
    var JSEvents = {
      keyEvent: 0,
      mouseEvent: 0,
      wheelEvent: 0,
      uiEvent: 0,
      focusEvent: 0,
      deviceOrientationEvent: 0,
      deviceMotionEvent: 0,
      fullscreenChangeEvent: 0,
      pointerlockChangeEvent: 0,
      visibilityChangeEvent: 0,
      touchEvent: 0,
      previousFullscreenElement: null,
      previousScreenX: null,
      previousScreenY: null,
      removeEventListenersRegistered: false,
      removeAllEventListeners: function () {
        for (var i = JSEvents.eventHandlers.length - 1; i >= 0; --i) {
          JSEvents._removeHandler(i)
        }
        JSEvents.eventHandlers = []
        JSEvents.deferredCalls = []
      },
      registerRemoveEventListeners: function () {
        if (!JSEvents.removeEventListenersRegistered) {
          __ATEXIT__.push(JSEvents.removeAllEventListeners)
          JSEvents.removeEventListenersRegistered = true
        }
      },
      deferredCalls: [],
      deferCall: function (targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
          if (arrA.length != arrB.length) return false
          for (var i in arrA) {
            if (arrA[i] != arrB[i]) return false
          }
          return true
        }
        for (var i in JSEvents.deferredCalls) {
          var call = JSEvents.deferredCalls[i]
          if (
            call.targetFunction == targetFunction &&
            arraysHaveEqualContent(call.argsList, argsList)
          ) {
            return
          }
        }
        JSEvents.deferredCalls.push({
          targetFunction: targetFunction,
          precedence: precedence,
          argsList: argsList
        })
        JSEvents.deferredCalls.sort(function (x, y) {
          return x.precedence < y.precedence
        })
      },
      removeDeferredCalls: function (targetFunction) {
        for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
          if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
            JSEvents.deferredCalls.splice(i, 1)
            --i
          }
        }
      },
      canPerformEventHandlerRequests: function () {
        return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls
      },
      runDeferredCalls: function () {
        if (!JSEvents.canPerformEventHandlerRequests()) {
          return
        }
        for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
          var call = JSEvents.deferredCalls[i]
          JSEvents.deferredCalls.splice(i, 1)
          --i
          call.targetFunction.apply(null, call.argsList)
        }
      },
      inEventHandler: 0,
      currentEventHandler: null,
      eventHandlers: [],
      removeAllHandlersOnTarget: function (target, eventTypeString) {
        for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
          if (
            JSEvents.eventHandlers[i].target == target &&
            (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)
          ) {
            JSEvents._removeHandler(i--)
          }
        }
      },
      _removeHandler: function (i) {
        var h = JSEvents.eventHandlers[i]
        h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture)
        JSEvents.eventHandlers.splice(i, 1)
      },
      registerOrRemoveHandler: function (eventHandler) {
        var jsEventHandler = function jsEventHandler(event) {
          ++JSEvents.inEventHandler
          JSEvents.currentEventHandler = eventHandler
          JSEvents.runDeferredCalls()
          eventHandler.handlerFunc(event)
          JSEvents.runDeferredCalls()
          --JSEvents.inEventHandler
        }
        if (eventHandler.callbackfunc) {
          eventHandler.eventListenerFunc = jsEventHandler
          eventHandler.target.addEventListener(
            eventHandler.eventTypeString,
            jsEventHandler,
            eventHandler.useCapture
          )
          JSEvents.eventHandlers.push(eventHandler)
          JSEvents.registerRemoveEventListeners()
        } else {
          for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (
              JSEvents.eventHandlers[i].target == eventHandler.target &&
              JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString
            ) {
              JSEvents._removeHandler(i--)
            }
          }
        }
      },
      getNodeNameForTarget: function (target) {
        if (!target) return ''
        if (target == window) return '#window'
        if (target == screen) return '#screen'
        return target && target.nodeName ? target.nodeName : ''
      },
      fullscreenEnabled: function () {
        return document.fullscreenEnabled || document.webkitFullscreenEnabled
      }
    }
    var __emscripten_webgl_power_preferences = ['default', 'low-power', 'high-performance']
    function __maybeCStringToJsString(cString) {
      return cString === cString + 0 ? UTF8ToString(cString) : cString
    }
    var __specialEventTargets = [
      0,
      typeof document !== 'undefined' ? document : 0,
      typeof window !== 'undefined' ? window : 0
    ]
    function __findEventTarget(target) {
      var domElement =
        __specialEventTargets[target] ||
        (typeof document !== 'undefined'
          ? document.querySelector(__maybeCStringToJsString(target))
          : undefined)
      return domElement
    }
    function __findCanvasEventTarget(target) {
      return __findEventTarget(target)
    }
    function _emscripten_webgl_do_create_context(target, attributes) {
      var contextAttributes = {}
      var a = attributes >> 2
      contextAttributes['alpha'] = !!HEAP32[a + (0 >> 2)]
      contextAttributes['depth'] = !!HEAP32[a + (4 >> 2)]
      contextAttributes['stencil'] = !!HEAP32[a + (8 >> 2)]
      contextAttributes['antialias'] = !!HEAP32[a + (12 >> 2)]
      contextAttributes['premultipliedAlpha'] = !!HEAP32[a + (16 >> 2)]
      contextAttributes['preserveDrawingBuffer'] = !!HEAP32[a + (20 >> 2)]
      var powerPreference = HEAP32[a + (24 >> 2)]
      contextAttributes['powerPreference'] = __emscripten_webgl_power_preferences[powerPreference]
      contextAttributes['failIfMajorPerformanceCaveat'] = !!HEAP32[a + (28 >> 2)]
      contextAttributes.majorVersion = HEAP32[a + (32 >> 2)]
      contextAttributes.minorVersion = HEAP32[a + (36 >> 2)]
      contextAttributes.enableExtensionsByDefault = HEAP32[a + (40 >> 2)]
      contextAttributes.explicitSwapControl = HEAP32[a + (44 >> 2)]
      contextAttributes.proxyContextToMainThread = HEAP32[a + (48 >> 2)]
      contextAttributes.renderViaOffscreenBackBuffer = HEAP32[a + (52 >> 2)]
      var canvas = __findCanvasEventTarget(target)
      if (!canvas) {
        return 0
      }
      if (
        contextAttributes.explicitSwapControl &&
        !contextAttributes.renderViaOffscreenBackBuffer
      ) {
        contextAttributes.renderViaOffscreenBackBuffer = true
      }
      var contextHandle = GL.createContext(canvas, contextAttributes)
      return contextHandle
    }
    function _emscripten_webgl_create_context(a0, a1) {
      return _emscripten_webgl_do_create_context(a0, a1)
    }
    function _emscripten_webgl_destroy_context_calling_thread(contextHandle) {
      if (GL.currentContext == contextHandle) GL.currentContext = 0
      GL.deleteContext(contextHandle)
    }
    function _emscripten_webgl_destroy_context(a0) {
      return _emscripten_webgl_destroy_context_calling_thread(a0)
    }
    function _emscripten_webgl_init_context_attributes(attributes) {
      var a = attributes >> 2
      for (var i = 0; i < 56 >> 2; ++i) {
        HEAP32[a + i] = 0
      }
      HEAP32[a + (0 >> 2)] =
        HEAP32[a + (4 >> 2)] =
        HEAP32[a + (12 >> 2)] =
        HEAP32[a + (16 >> 2)] =
        HEAP32[a + (32 >> 2)] =
        HEAP32[a + (40 >> 2)] =
          1
    }
    function _emscripten_webgl_make_context_current(contextHandle) {
      var success = GL.makeContextCurrent(contextHandle)
      return success ? 0 : -5
    }
    Module['_emscripten_webgl_make_context_current'] = _emscripten_webgl_make_context_current
    var ENV = {}
    function __getExecutableName() {
      return thisProgram || './this.program'
    }
    function _emscripten_get_environ() {
      if (!_emscripten_get_environ.strings) {
        var env = {
          USER: 'web_user',
          LOGNAME: 'web_user',
          PATH: '/',
          PWD: '/',
          HOME: '/home/web_user',
          LANG:
            (
              (typeof navigator === 'object' && navigator.languages && navigator.languages[0]) ||
              'C'
            ).replace('-', '_') + '.UTF-8',
          _: __getExecutableName()
        }
        for (var x in ENV) {
          env[x] = ENV[x]
        }
        var strings = []
        for (var x in env) {
          strings.push(x + '=' + env[x])
        }
        _emscripten_get_environ.strings = strings
      }
      return _emscripten_get_environ.strings
    }
    function _environ_get(__environ, environ_buf) {
      var strings = _emscripten_get_environ()
      var bufSize = 0
      strings.forEach(function (string, i) {
        var ptr = environ_buf + bufSize
        HEAP32[(__environ + i * 4) >> 2] = ptr
        writeAsciiToMemory(string, ptr)
        bufSize += string.length + 1
      })
      return 0
    }
    function _environ_sizes_get(penviron_count, penviron_buf_size) {
      var strings = _emscripten_get_environ()
      HEAP32[penviron_count >> 2] = strings.length
      var bufSize = 0
      strings.forEach(function (string) {
        bufSize += string.length + 1
      })
      HEAP32[penviron_buf_size >> 2] = bufSize
      return 0
    }
    function _fd_close(fd) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        FS.close(stream)
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return e.errno
      }
    }
    function _fd_fdstat_get(fd, pbuf) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4
        HEAP8[pbuf >> 0] = type
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return e.errno
      }
    }
    function _fd_read(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        var num = SYSCALLS.doReadv(stream, iov, iovcnt)
        HEAP32[pnum >> 2] = num
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return e.errno
      }
    }
    function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        var HIGH_OFFSET = 4294967296
        var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0)
        var DOUBLE_LIMIT = 9007199254740992
        if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
          return -61
        }
        FS.llseek(stream, offset, whence)
        ;(tempI64 = [
          stream.position >>> 0,
          ((tempDouble = stream.position),
          +Math_abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
              : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
            : 0)
        ]),
          (HEAP32[newOffset >> 2] = tempI64[0]),
          (HEAP32[(newOffset + 4) >> 2] = tempI64[1])
        if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return e.errno
      }
    }
    function _fd_sync(fd) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        if (stream.stream_ops && stream.stream_ops.fsync) {
          return -stream.stream_ops.fsync(stream)
        }
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return e.errno
      }
    }
    function _fd_write(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        var num = SYSCALLS.doWritev(stream, iov, iovcnt)
        HEAP32[pnum >> 2] = num
        return 0
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
        return e.errno
      }
    }
    function _fork() {
      ___setErrNo(6)
      return -1
    }
    var GAI_ERRNO_MESSAGES = {}
    function _gai_strerror(val) {
      var buflen = 256
      if (!_gai_strerror.buffer) {
        _gai_strerror.buffer = _malloc(buflen)
        GAI_ERRNO_MESSAGES['0'] = 'Success'
        GAI_ERRNO_MESSAGES['' + -1] = "Invalid value for 'ai_flags' field"
        GAI_ERRNO_MESSAGES['' + -2] = 'NAME or SERVICE is unknown'
        GAI_ERRNO_MESSAGES['' + -3] = 'Temporary failure in name resolution'
        GAI_ERRNO_MESSAGES['' + -4] = 'Non-recoverable failure in name res'
        GAI_ERRNO_MESSAGES['' + -6] = "'ai_family' not supported"
        GAI_ERRNO_MESSAGES['' + -7] = "'ai_socktype' not supported"
        GAI_ERRNO_MESSAGES['' + -8] = "SERVICE not supported for 'ai_socktype'"
        GAI_ERRNO_MESSAGES['' + -10] = 'Memory allocation failure'
        GAI_ERRNO_MESSAGES['' + -11] = "System error returned in 'errno'"
        GAI_ERRNO_MESSAGES['' + -12] = 'Argument buffer overflow'
      }
      var msg = 'Unknown error'
      if (val in GAI_ERRNO_MESSAGES) {
        if (GAI_ERRNO_MESSAGES[val].length > buflen - 1) {
          msg = 'Message too long'
        } else {
          msg = GAI_ERRNO_MESSAGES[val]
        }
      }
      writeAsciiToMemory(msg, _gai_strerror.buffer)
      return _gai_strerror.buffer
    }
    function _getTempRet0() {
      return getTempRet0() | 0
    }
    function _getaddrinfo(node, service, hint, out) {
      var addr = 0
      var port = 0
      var flags = 0
      var family = 0
      var type = 0
      var proto = 0
      var ai
      function allocaddrinfo(family, type, proto, canon, addr, port) {
        var sa, salen, ai
        var res
        salen = family === 10 ? 28 : 16
        addr = family === 10 ? __inet_ntop6_raw(addr) : __inet_ntop4_raw(addr)
        sa = _malloc(salen)
        res = __write_sockaddr(sa, family, addr, port)
        assert(!res.errno)
        ai = _malloc(32)
        HEAP32[(ai + 4) >> 2] = family
        HEAP32[(ai + 8) >> 2] = type
        HEAP32[(ai + 12) >> 2] = proto
        HEAP32[(ai + 24) >> 2] = canon
        HEAP32[(ai + 20) >> 2] = sa
        if (family === 10) {
          HEAP32[(ai + 16) >> 2] = 28
        } else {
          HEAP32[(ai + 16) >> 2] = 16
        }
        HEAP32[(ai + 28) >> 2] = 0
        return ai
      }
      if (hint) {
        flags = HEAP32[hint >> 2]
        family = HEAP32[(hint + 4) >> 2]
        type = HEAP32[(hint + 8) >> 2]
        proto = HEAP32[(hint + 12) >> 2]
      }
      if (type && !proto) {
        proto = type === 2 ? 17 : 6
      }
      if (!type && proto) {
        type = proto === 17 ? 2 : 1
      }
      if (proto === 0) {
        proto = 6
      }
      if (type === 0) {
        type = 1
      }
      if (!node && !service) {
        return -2
      }
      if (flags & ~(1 | 2 | 4 | 1024 | 8 | 16 | 32)) {
        return -1
      }
      if (hint !== 0 && HEAP32[hint >> 2] & 2 && !node) {
        return -1
      }
      if (flags & 32) {
        return -2
      }
      if (type !== 0 && type !== 1 && type !== 2) {
        return -7
      }
      if (family !== 0 && family !== 2 && family !== 10) {
        return -6
      }
      if (service) {
        service = UTF8ToString(service)
        port = parseInt(service, 10)
        if (isNaN(port)) {
          if (flags & 1024) {
            return -2
          }
          return -8
        }
      }
      if (!node) {
        if (family === 0) {
          family = 2
        }
        if ((flags & 1) === 0) {
          if (family === 2) {
            addr = _htonl(2130706433)
          } else {
            addr = [0, 0, 0, 1]
          }
        }
        ai = allocaddrinfo(family, type, proto, null, addr, port)
        HEAP32[out >> 2] = ai
        return 0
      }
      node = UTF8ToString(node)
      addr = __inet_pton4_raw(node)
      if (addr !== null) {
        if (family === 0 || family === 2) {
          family = 2
        } else if (family === 10 && flags & 8) {
          addr = [0, 0, _htonl(65535), addr]
          family = 10
        } else {
          return -2
        }
      } else {
        addr = __inet_pton6_raw(node)
        if (addr !== null) {
          if (family === 0 || family === 10) {
            family = 10
          } else {
            return -2
          }
        }
      }
      if (addr != null) {
        ai = allocaddrinfo(family, type, proto, node, addr, port)
        HEAP32[out >> 2] = ai
        return 0
      }
      if (flags & 4) {
        return -2
      }
      node = DNS.lookup_name(node)
      addr = __inet_pton4_raw(node)
      if (family === 0) {
        family = 2
      } else if (family === 10) {
        addr = [0, 0, _htonl(65535), addr]
      }
      ai = allocaddrinfo(family, type, proto, null, addr, port)
      HEAP32[out >> 2] = ai
      return 0
    }
    function _getgrgid_r() {
      throw 'getgrgid_r: TODO'
    }
    function _getgrnam_r() {
      throw 'getgrnam_r: TODO'
    }
    function _getnameinfo(sa, salen, node, nodelen, serv, servlen, flags) {
      var info = __read_sockaddr(sa, salen)
      if (info.errno) {
        return -6
      }
      var port = info.port
      var addr = info.addr
      var overflowed = false
      if (node && nodelen) {
        var lookup
        if (flags & 1 || !(lookup = DNS.lookup_addr(addr))) {
          if (flags & 8) {
            return -2
          }
        } else {
          addr = lookup
        }
        var numBytesWrittenExclNull = stringToUTF8(addr, node, nodelen)
        if (numBytesWrittenExclNull + 1 >= nodelen) {
          overflowed = true
        }
      }
      if (serv && servlen) {
        port = '' + port
        var numBytesWrittenExclNull = stringToUTF8(port, serv, servlen)
        if (numBytesWrittenExclNull + 1 >= servlen) {
          overflowed = true
        }
      }
      if (overflowed) {
        return -12
      }
      return 0
    }
    var Protocols = { list: [], map: {} }
    function _setprotoent(stayopen) {
      function allocprotoent(name, proto, aliases) {
        var nameBuf = _malloc(name.length + 1)
        writeAsciiToMemory(name, nameBuf)
        var j = 0
        var length = aliases.length
        var aliasListBuf = _malloc((length + 1) * 4)
        for (var i = 0; i < length; i++, j += 4) {
          var alias = aliases[i]
          var aliasBuf = _malloc(alias.length + 1)
          writeAsciiToMemory(alias, aliasBuf)
          HEAP32[(aliasListBuf + j) >> 2] = aliasBuf
        }
        HEAP32[(aliasListBuf + j) >> 2] = 0
        var pe = _malloc(12)
        HEAP32[pe >> 2] = nameBuf
        HEAP32[(pe + 4) >> 2] = aliasListBuf
        HEAP32[(pe + 8) >> 2] = proto
        return pe
      }
      var list = Protocols.list
      var map = Protocols.map
      if (list.length === 0) {
        var entry = allocprotoent('tcp', 6, ['TCP'])
        list.push(entry)
        map['tcp'] = map['6'] = entry
        entry = allocprotoent('udp', 17, ['UDP'])
        list.push(entry)
        map['udp'] = map['17'] = entry
      }
      _setprotoent.index = 0
    }
    function _getprotobyname(name) {
      name = UTF8ToString(name)
      _setprotoent(true)
      var result = Protocols.map[name]
      return result
    }
    function _gettimeofday(ptr) {
      var now = Date.now()
      HEAP32[ptr >> 2] = (now / 1e3) | 0
      HEAP32[(ptr + 4) >> 2] = ((now % 1e3) * 1e3) | 0
      return 0
    }
    function _glActiveTexture(x0) {
      GLctx['activeTexture'](x0)
    }
    function _glAttachShader(program, shader) {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader])
    }
    function _glBeginTransformFeedback(x0) {
      GLctx['beginTransformFeedback'](x0)
    }
    function _glBindAttribLocation(program, index, name) {
      GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name))
    }
    function _glBindBuffer(target, buffer) {
      if (target == 35051) {
        GLctx.currentPixelPackBufferBinding = buffer
      } else if (target == 35052) {
        GLctx.currentPixelUnpackBufferBinding = buffer
      }
      GLctx.bindBuffer(target, GL.buffers[buffer])
    }
    function _glBindBufferBase(target, index, buffer) {
      GLctx['bindBufferBase'](target, index, GL.buffers[buffer])
    }
    function _glBindFramebuffer(target, framebuffer) {
      GLctx.bindFramebuffer(
        target,
        framebuffer ? GL.framebuffers[framebuffer] : GL.currentContext.defaultFbo
      )
    }
    function _glBindRenderbuffer(target, renderbuffer) {
      GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer])
    }
    function _glBindTexture(target, texture) {
      GLctx.bindTexture(target, GL.textures[texture])
    }
    function _glBindVertexArray(vao) {
      GLctx['bindVertexArray'](GL.vaos[vao])
    }
    function _glBlendEquation(x0) {
      GLctx['blendEquation'](x0)
    }
    function _glBlendFunc(x0, x1) {
      GLctx['blendFunc'](x0, x1)
    }
    function _glBlendFuncSeparate(x0, x1, x2, x3) {
      GLctx['blendFuncSeparate'](x0, x1, x2, x3)
    }
    function _glBlitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) {
      GLctx['blitFramebuffer'](x0, x1, x2, x3, x4, x5, x6, x7, x8, x9)
    }
    function _glBufferData(target, size, data, usage) {
      if (GL.currentContext.version >= 2) {
        if (data) {
          GLctx.bufferData(target, HEAPU8, usage, data, size)
        } else {
          GLctx.bufferData(target, size, usage)
        }
      } else {
        GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage)
      }
    }
    function _glBufferSubData(target, offset, size, data) {
      if (GL.currentContext.version >= 2) {
        GLctx.bufferSubData(target, offset, HEAPU8, data, size)
        return
      }
      GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data + size))
    }
    function _glCheckFramebufferStatus(x0) {
      return GLctx['checkFramebufferStatus'](x0)
    }
    function _glClear(x0) {
      GLctx['clear'](x0)
    }
    function _glClearBufferfv(buffer, drawbuffer, value) {
      GLctx['clearBufferfv'](buffer, drawbuffer, HEAPF32, value >> 2)
    }
    function _glClearColor(x0, x1, x2, x3) {
      GLctx['clearColor'](x0, x1, x2, x3)
    }
    function _glClearDepthf(x0) {
      GLctx['clearDepth'](x0)
    }
    function _glColorMask(red, green, blue, alpha) {
      GLctx.colorMask(!!red, !!green, !!blue, !!alpha)
    }
    function _glCompileShader(shader) {
      GLctx.compileShader(GL.shaders[shader])
    }
    function _glCompressedTexImage2D(
      target,
      level,
      internalFormat,
      width,
      height,
      border,
      imageSize,
      data
    ) {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx['compressedTexImage2D'](
            target,
            level,
            internalFormat,
            width,
            height,
            border,
            imageSize,
            data
          )
        } else {
          GLctx['compressedTexImage2D'](
            target,
            level,
            internalFormat,
            width,
            height,
            border,
            HEAPU8,
            data,
            imageSize
          )
        }
        return
      }
      GLctx['compressedTexImage2D'](
        target,
        level,
        internalFormat,
        width,
        height,
        border,
        data ? HEAPU8.subarray(data, data + imageSize) : null
      )
    }
    function _glCompressedTexSubImage2D(
      target,
      level,
      xoffset,
      yoffset,
      width,
      height,
      format,
      imageSize,
      data
    ) {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx['compressedTexSubImage2D'](
            target,
            level,
            xoffset,
            yoffset,
            width,
            height,
            format,
            imageSize,
            data
          )
        } else {
          GLctx['compressedTexSubImage2D'](
            target,
            level,
            xoffset,
            yoffset,
            width,
            height,
            format,
            HEAPU8,
            data,
            imageSize
          )
        }
        return
      }
      GLctx['compressedTexSubImage2D'](
        target,
        level,
        xoffset,
        yoffset,
        width,
        height,
        format,
        data ? HEAPU8.subarray(data, data + imageSize) : null
      )
    }
    function _glCompressedTexSubImage3D(
      target,
      level,
      xoffset,
      yoffset,
      zoffset,
      width,
      height,
      depth,
      format,
      imageSize,
      data
    ) {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx['compressedTexSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          imageSize,
          data
        )
      } else {
        GLctx['compressedTexSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          HEAPU8,
          data,
          imageSize
        )
      }
    }
    function _glCopyBufferSubData(x0, x1, x2, x3, x4) {
      GLctx['copyBufferSubData'](x0, x1, x2, x3, x4)
    }
    function _glCopyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7) {
      GLctx['copyTexSubImage2D'](x0, x1, x2, x3, x4, x5, x6, x7)
    }
    function _glCreateProgram() {
      var id = GL.getNewId(GL.programs)
      var program = GLctx.createProgram()
      program.name = id
      GL.programs[id] = program
      return id
    }
    function _glCreateShader(shaderType) {
      var id = GL.getNewId(GL.shaders)
      GL.shaders[id] = GLctx.createShader(shaderType)
      return id
    }
    function _glCullFace(x0) {
      GLctx['cullFace'](x0)
    }
    function _glDeleteBuffers(n, buffers) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(buffers + i * 4) >> 2]
        var buffer = GL.buffers[id]
        if (!buffer) continue
        GLctx.deleteBuffer(buffer)
        buffer.name = 0
        GL.buffers[id] = null
        if (id == GL.currArrayBuffer) GL.currArrayBuffer = 0
        if (id == GL.currElementArrayBuffer) GL.currElementArrayBuffer = 0
        if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0
        if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0
      }
    }
    function _glDeleteFramebuffers(n, framebuffers) {
      for (var i = 0; i < n; ++i) {
        var id = HEAP32[(framebuffers + i * 4) >> 2]
        var framebuffer = GL.framebuffers[id]
        if (!framebuffer) continue
        GLctx.deleteFramebuffer(framebuffer)
        framebuffer.name = 0
        GL.framebuffers[id] = null
      }
    }
    function _glDeleteProgram(id) {
      if (!id) return
      var program = GL.programs[id]
      if (!program) {
        GL.recordError(1281)
        return
      }
      GLctx.deleteProgram(program)
      program.name = 0
      GL.programs[id] = null
      GL.programInfos[id] = null
    }
    function _glDeleteRenderbuffers(n, renderbuffers) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(renderbuffers + i * 4) >> 2]
        var renderbuffer = GL.renderbuffers[id]
        if (!renderbuffer) continue
        GLctx.deleteRenderbuffer(renderbuffer)
        renderbuffer.name = 0
        GL.renderbuffers[id] = null
      }
    }
    function _glDeleteShader(id) {
      if (!id) return
      var shader = GL.shaders[id]
      if (!shader) {
        GL.recordError(1281)
        return
      }
      GLctx.deleteShader(shader)
      GL.shaders[id] = null
    }
    function _glDeleteTextures(n, textures) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(textures + i * 4) >> 2]
        var texture = GL.textures[id]
        if (!texture) continue
        GLctx.deleteTexture(texture)
        texture.name = 0
        GL.textures[id] = null
      }
    }
    function _glDeleteVertexArrays(n, vaos) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(vaos + i * 4) >> 2]
        GLctx['deleteVertexArray'](GL.vaos[id])
        GL.vaos[id] = null
      }
    }
    function _glDepthFunc(x0) {
      GLctx['depthFunc'](x0)
    }
    function _glDepthMask(flag) {
      GLctx.depthMask(!!flag)
    }
    function _glDisable(x0) {
      GLctx['disable'](x0)
    }
    function _glDisableVertexAttribArray(index) {
      GLctx.disableVertexAttribArray(index)
    }
    function _glDrawArrays(mode, first, count) {
      GLctx.drawArrays(mode, first, count)
    }
    function _glDrawArraysInstanced(mode, first, count, primcount) {
      GLctx['drawArraysInstanced'](mode, first, count, primcount)
    }
    function _glDrawBuffers(n, bufs) {
      var bufArray = __tempFixedLengthArray[n]
      for (var i = 0; i < n; i++) {
        bufArray[i] = HEAP32[(bufs + i * 4) >> 2]
      }
      GLctx['drawBuffers'](bufArray)
    }
    function _glDrawElementsInstanced(mode, count, type, indices, primcount) {
      GLctx['drawElementsInstanced'](mode, count, type, indices, primcount)
    }
    function _glEnable(x0) {
      GLctx['enable'](x0)
    }
    function _glEnableVertexAttribArray(index) {
      GLctx.enableVertexAttribArray(index)
    }
    function _glEndTransformFeedback() {
      GLctx['endTransformFeedback']()
    }
    function _glFinish() {
      GLctx['finish']()
    }
    function _glFramebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer) {
      GLctx.framebufferRenderbuffer(
        target,
        attachment,
        renderbuffertarget,
        GL.renderbuffers[renderbuffer]
      )
    }
    function _glFramebufferTexture2D(target, attachment, textarget, texture, level) {
      GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level)
    }
    function _glFramebufferTextureLayer(target, attachment, texture, level, layer) {
      GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer)
    }
    function _glFrontFace(x0) {
      GLctx['frontFace'](x0)
    }
    function _glGenBuffers(n, buffers) {
      __glGenObject(n, buffers, 'createBuffer', GL.buffers)
    }
    function _glGenFramebuffers(n, ids) {
      __glGenObject(n, ids, 'createFramebuffer', GL.framebuffers)
    }
    function _glGenRenderbuffers(n, renderbuffers) {
      __glGenObject(n, renderbuffers, 'createRenderbuffer', GL.renderbuffers)
    }
    function _glGenTextures(n, textures) {
      __glGenObject(n, textures, 'createTexture', GL.textures)
    }
    function _glGenVertexArrays(n, arrays) {
      __glGenObject(n, arrays, 'createVertexArray', GL.vaos)
    }
    function _glGenerateMipmap(x0) {
      GLctx['generateMipmap'](x0)
    }
    function _glGetError() {
      var error = GLctx.getError() || GL.lastError
      GL.lastError = 0
      return error
    }
    function _glGetFloatv(name_, p) {
      emscriptenWebGLGet(name_, p, 2)
    }
    function _glGetIntegerv(name_, p) {
      emscriptenWebGLGet(name_, p, 0)
    }
    function _glGetProgramBinary(program, bufSize, length, binaryFormat, binary) {
      GL.recordError(1282)
    }
    function _glGetProgramInfoLog(program, maxLength, length, infoLog) {
      var log = GLctx.getProgramInfoLog(GL.programs[program])
      if (log === null) log = '(unknown error)'
      var numBytesWrittenExclNull =
        maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0
      if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
    }
    function _glGetProgramiv(program, pname, p) {
      if (!p) {
        GL.recordError(1281)
        return
      }
      if (program >= GL.counter) {
        GL.recordError(1281)
        return
      }
      var ptable = GL.programInfos[program]
      if (!ptable) {
        GL.recordError(1282)
        return
      }
      if (pname == 35716) {
        var log = GLctx.getProgramInfoLog(GL.programs[program])
        if (log === null) log = '(unknown error)'
        HEAP32[p >> 2] = log.length + 1
      } else if (pname == 35719) {
        HEAP32[p >> 2] = ptable.maxUniformLength
      } else if (pname == 35722) {
        if (ptable.maxAttributeLength == -1) {
          program = GL.programs[program]
          var numAttribs = GLctx.getProgramParameter(program, 35721)
          ptable.maxAttributeLength = 0
          for (var i = 0; i < numAttribs; ++i) {
            var activeAttrib = GLctx.getActiveAttrib(program, i)
            ptable.maxAttributeLength = Math.max(
              ptable.maxAttributeLength,
              activeAttrib.name.length + 1
            )
          }
        }
        HEAP32[p >> 2] = ptable.maxAttributeLength
      } else if (pname == 35381) {
        if (ptable.maxUniformBlockNameLength == -1) {
          program = GL.programs[program]
          var numBlocks = GLctx.getProgramParameter(program, 35382)
          ptable.maxUniformBlockNameLength = 0
          for (var i = 0; i < numBlocks; ++i) {
            var activeBlockName = GLctx.getActiveUniformBlockName(program, i)
            ptable.maxUniformBlockNameLength = Math.max(
              ptable.maxUniformBlockNameLength,
              activeBlockName.length + 1
            )
          }
        }
        HEAP32[p >> 2] = ptable.maxUniformBlockNameLength
      } else {
        HEAP32[p >> 2] = GLctx.getProgramParameter(GL.programs[program], pname)
      }
    }
    function _glGetShaderInfoLog(shader, maxLength, length, infoLog) {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader])
      if (log === null) log = '(unknown error)'
      var numBytesWrittenExclNull =
        maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0
      if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
    }
    function _glGetShaderSource(shader, bufSize, length, source) {
      var result = GLctx.getShaderSource(GL.shaders[shader])
      if (!result) return
      var numBytesWrittenExclNull =
        bufSize > 0 && source ? stringToUTF8(result, source, bufSize) : 0
      if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
    }
    function _glGetShaderiv(shader, pname, p) {
      if (!p) {
        GL.recordError(1281)
        return
      }
      if (pname == 35716) {
        var log = GLctx.getShaderInfoLog(GL.shaders[shader])
        if (log === null) log = '(unknown error)'
        HEAP32[p >> 2] = log.length + 1
      } else if (pname == 35720) {
        var source = GLctx.getShaderSource(GL.shaders[shader])
        var sourceLength = source === null || source.length == 0 ? 0 : source.length + 1
        HEAP32[p >> 2] = sourceLength
      } else {
        HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname)
      }
    }
    function _glGetString(name_) {
      if (GL.stringCache[name_]) return GL.stringCache[name_]
      var ret
      switch (name_) {
        case 7939:
          var exts = GLctx.getSupportedExtensions() || []
          exts = exts.concat(
            exts.map(function (e) {
              return 'GL_' + e
            })
          )
          ret = stringToNewUTF8(exts.join(' '))
          break
        case 7936:
        case 7937:
        case 37445:
        case 37446:
          var s = GLctx.getParameter(name_)
          if (!s) {
            GL.recordError(1280)
          }
          ret = stringToNewUTF8(s)
          break
        case 7938:
          var glVersion = GLctx.getParameter(7938)
          if (GL.currentContext.version >= 2) glVersion = 'OpenGL ES 3.0 (' + glVersion + ')'
          else {
            glVersion = 'OpenGL ES 2.0 (' + glVersion + ')'
          }
          ret = stringToNewUTF8(glVersion)
          break
        case 35724:
          var glslVersion = GLctx.getParameter(35724)
          var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/
          var ver_num = glslVersion.match(ver_re)
          if (ver_num !== null) {
            if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + '0'
            glslVersion = 'OpenGL ES GLSL ES ' + ver_num[1] + ' (' + glslVersion + ')'
          }
          ret = stringToNewUTF8(glslVersion)
          break
        default:
          GL.recordError(1280)
          return 0
      }
      GL.stringCache[name_] = ret
      return ret
    }
    function _glGetStringi(name, index) {
      if (GL.currentContext.version < 2) {
        GL.recordError(1282)
        return 0
      }
      var stringiCache = GL.stringiCache[name]
      if (stringiCache) {
        if (index < 0 || index >= stringiCache.length) {
          GL.recordError(1281)
          return 0
        }
        return stringiCache[index]
      }
      switch (name) {
        case 7939:
          var exts = GLctx.getSupportedExtensions() || []
          exts = exts.concat(
            exts.map(function (e) {
              return 'GL_' + e
            })
          )
          exts = exts.map(function (e) {
            return stringToNewUTF8(e)
          })
          stringiCache = GL.stringiCache[name] = exts
          if (index < 0 || index >= stringiCache.length) {
            GL.recordError(1281)
            return 0
          }
          return stringiCache[index]
        default:
          GL.recordError(1280)
          return 0
      }
    }
    function _glGetUniformBlockIndex(program, uniformBlockName) {
      return GLctx['getUniformBlockIndex'](GL.programs[program], UTF8ToString(uniformBlockName))
    }
    function _glGetUniformLocation(program, name) {
      name = UTF8ToString(name)
      var arrayIndex = 0
      if (name[name.length - 1] == ']') {
        var leftBrace = name.lastIndexOf('[')
        arrayIndex = name[leftBrace + 1] != ']' ? jstoi_q(name.slice(leftBrace + 1)) : 0
        name = name.slice(0, leftBrace)
      }
      var uniformInfo = GL.programInfos[program] && GL.programInfos[program].uniforms[name]
      if (uniformInfo && arrayIndex >= 0 && arrayIndex < uniformInfo[0]) {
        return uniformInfo[1] + arrayIndex
      } else {
        return -1
      }
    }
    function _glInvalidateFramebuffer(target, numAttachments, attachments) {
      var list = __tempFixedLengthArray[numAttachments]
      for (var i = 0; i < numAttachments; i++) {
        list[i] = HEAP32[(attachments + i * 4) >> 2]
      }
      GLctx['invalidateFramebuffer'](target, list)
    }
    function _glLinkProgram(program) {
      GLctx.linkProgram(GL.programs[program])
      GL.populateUniformTable(program)
    }
    function _glPixelStorei(pname, param) {
      if (pname == 3317) {
        GL.unpackAlignment = param
      }
      GLctx.pixelStorei(pname, param)
    }
    function _glProgramBinary(program, binaryFormat, binary, length) {
      GL.recordError(1280)
    }
    function _glProgramParameteri(program, pname, value) {
      GL.recordError(1280)
    }
    function _glReadBuffer(x0) {
      GLctx['readBuffer'](x0)
    }
    function _glReadPixels(x, y, width, height, format, type, pixels) {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelPackBufferBinding) {
          GLctx.readPixels(x, y, width, height, format, type, pixels)
        } else {
          var heap = __heapObjectForWebGLType(type)
          GLctx.readPixels(
            x,
            y,
            width,
            height,
            format,
            type,
            heap,
            pixels >> __heapAccessShiftForWebGLHeap(heap)
          )
        }
        return
      }
      var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format)
      if (!pixelData) {
        GL.recordError(1280)
        return
      }
      GLctx.readPixels(x, y, width, height, format, type, pixelData)
    }
    function _glRenderbufferStorage(x0, x1, x2, x3) {
      GLctx['renderbufferStorage'](x0, x1, x2, x3)
    }
    function _glRenderbufferStorageMultisample(x0, x1, x2, x3, x4) {
      GLctx['renderbufferStorageMultisample'](x0, x1, x2, x3, x4)
    }
    function _glScissor(x0, x1, x2, x3) {
      GLctx['scissor'](x0, x1, x2, x3)
    }
    function _glShaderSource(shader, count, string, length) {
      var source = GL.getSource(shader, count, string, length)
      GLctx.shaderSource(GL.shaders[shader], source)
    }
    function _glTexImage2D(
      target,
      level,
      internalFormat,
      width,
      height,
      border,
      format,
      type,
      pixels
    ) {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texImage2D(
            target,
            level,
            internalFormat,
            width,
            height,
            border,
            format,
            type,
            pixels
          )
        } else if (pixels) {
          var heap = __heapObjectForWebGLType(type)
          GLctx.texImage2D(
            target,
            level,
            internalFormat,
            width,
            height,
            border,
            format,
            type,
            heap,
            pixels >> __heapAccessShiftForWebGLHeap(heap)
          )
        } else {
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, null)
        }
        return
      }
      GLctx.texImage2D(
        target,
        level,
        internalFormat,
        width,
        height,
        border,
        format,
        type,
        pixels
          ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat)
          : null
      )
    }
    function _glTexImage3D(
      target,
      level,
      internalFormat,
      width,
      height,
      depth,
      border,
      format,
      type,
      pixels
    ) {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx['texImage3D'](
          target,
          level,
          internalFormat,
          width,
          height,
          depth,
          border,
          format,
          type,
          pixels
        )
      } else if (pixels) {
        var heap = __heapObjectForWebGLType(type)
        GLctx['texImage3D'](
          target,
          level,
          internalFormat,
          width,
          height,
          depth,
          border,
          format,
          type,
          heap,
          pixels >> __heapAccessShiftForWebGLHeap(heap)
        )
      } else {
        GLctx['texImage3D'](
          target,
          level,
          internalFormat,
          width,
          height,
          depth,
          border,
          format,
          type,
          null
        )
      }
    }
    function _glTexParameterf(x0, x1, x2) {
      GLctx['texParameterf'](x0, x1, x2)
    }
    function _glTexParameteri(x0, x1, x2) {
      GLctx['texParameteri'](x0, x1, x2)
    }
    function _glTexStorage2D(x0, x1, x2, x3, x4) {
      GLctx['texStorage2D'](x0, x1, x2, x3, x4)
    }
    function _glTexSubImage2D(
      target,
      level,
      xoffset,
      yoffset,
      width,
      height,
      format,
      type,
      pixels
    ) {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels)
        } else if (pixels) {
          var heap = __heapObjectForWebGLType(type)
          GLctx.texSubImage2D(
            target,
            level,
            xoffset,
            yoffset,
            width,
            height,
            format,
            type,
            heap,
            pixels >> __heapAccessShiftForWebGLHeap(heap)
          )
        } else {
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, null)
        }
        return
      }
      var pixelData = null
      if (pixels) pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0)
      GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData)
    }
    function _glTexSubImage3D(
      target,
      level,
      xoffset,
      yoffset,
      zoffset,
      width,
      height,
      depth,
      format,
      type,
      pixels
    ) {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx['texSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          type,
          pixels
        )
      } else if (pixels) {
        var heap = __heapObjectForWebGLType(type)
        GLctx['texSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          type,
          heap,
          pixels >> __heapAccessShiftForWebGLHeap(heap)
        )
      } else {
        GLctx['texSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          type,
          null
        )
      }
    }
    function _glTransformFeedbackVaryings(program, count, varyings, bufferMode) {
      program = GL.programs[program]
      var vars = []
      for (var i = 0; i < count; i++) vars.push(UTF8ToString(HEAP32[(varyings + i * 4) >> 2]))
      GLctx['transformFeedbackVaryings'](program, vars, bufferMode)
    }
    function _glUniform1f(location, v0) {
      GLctx.uniform1f(GL.uniforms[location], v0)
    }
    function _glUniform1i(location, v0) {
      GLctx.uniform1i(GL.uniforms[location], v0)
    }
    function _glUniform1iv(location, count, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniform1iv(GL.uniforms[location], HEAP32, value >> 2, count)
        return
      }
      if (count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferIntViews[count - 1]
        for (var i = 0; i < count; ++i) {
          view[i] = HEAP32[(value + 4 * i) >> 2]
        }
      } else {
        var view = HEAP32.subarray(value >> 2, (value + count * 4) >> 2)
      }
      GLctx.uniform1iv(GL.uniforms[location], view)
    }
    function _glUniform1ui(location, v0) {
      GLctx.uniform1ui(GL.uniforms[location], v0)
    }
    function _glUniform2f(location, v0, v1) {
      GLctx.uniform2f(GL.uniforms[location], v0, v1)
    }
    function _glUniform2fv(location, count, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniform2fv(GL.uniforms[location], HEAPF32, value >> 2, count * 2)
        return
      }
      if (2 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferFloatViews[2 * count - 1]
        for (var i = 0; i < 2 * count; i += 2) {
          view[i] = HEAPF32[(value + 4 * i) >> 2]
          view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 8) >> 2)
      }
      GLctx.uniform2fv(GL.uniforms[location], view)
    }
    function _glUniform2i(location, v0, v1) {
      GLctx.uniform2i(GL.uniforms[location], v0, v1)
    }
    function _glUniform2iv(location, count, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniform2iv(GL.uniforms[location], HEAP32, value >> 2, count * 2)
        return
      }
      if (2 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferIntViews[2 * count - 1]
        for (var i = 0; i < 2 * count; i += 2) {
          view[i] = HEAP32[(value + 4 * i) >> 2]
          view[i + 1] = HEAP32[(value + (4 * i + 4)) >> 2]
        }
      } else {
        var view = HEAP32.subarray(value >> 2, (value + count * 8) >> 2)
      }
      GLctx.uniform2iv(GL.uniforms[location], view)
    }
    function _glUniform3f(location, v0, v1, v2) {
      GLctx.uniform3f(GL.uniforms[location], v0, v1, v2)
    }
    function _glUniform3fv(location, count, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniform3fv(GL.uniforms[location], HEAPF32, value >> 2, count * 3)
        return
      }
      if (3 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferFloatViews[3 * count - 1]
        for (var i = 0; i < 3 * count; i += 3) {
          view[i] = HEAPF32[(value + 4 * i) >> 2]
          view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
          view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2]
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 12) >> 2)
      }
      GLctx.uniform3fv(GL.uniforms[location], view)
    }
    function _glUniform3i(location, v0, v1, v2) {
      GLctx.uniform3i(GL.uniforms[location], v0, v1, v2)
    }
    function _glUniform4f(location, v0, v1, v2, v3) {
      GLctx.uniform4f(GL.uniforms[location], v0, v1, v2, v3)
    }
    function _glUniform4fv(location, count, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniform4fv(GL.uniforms[location], HEAPF32, value >> 2, count * 4)
        return
      }
      if (4 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferFloatViews[4 * count - 1]
        for (var i = 0; i < 4 * count; i += 4) {
          view[i] = HEAPF32[(value + 4 * i) >> 2]
          view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
          view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2]
          view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2]
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 16) >> 2)
      }
      GLctx.uniform4fv(GL.uniforms[location], view)
    }
    function _glUniform4i(location, v0, v1, v2, v3) {
      GLctx.uniform4i(GL.uniforms[location], v0, v1, v2, v3)
    }
    function _glUniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding) {
      program = GL.programs[program]
      GLctx['uniformBlockBinding'](program, uniformBlockIndex, uniformBlockBinding)
    }
    function _glUniformMatrix2fv(location, count, transpose, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniformMatrix2fv(GL.uniforms[location], !!transpose, HEAPF32, value >> 2, count * 4)
        return
      }
      if (4 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferFloatViews[4 * count - 1]
        for (var i = 0; i < 4 * count; i += 4) {
          view[i] = HEAPF32[(value + 4 * i) >> 2]
          view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
          view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2]
          view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2]
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 16) >> 2)
      }
      GLctx.uniformMatrix2fv(GL.uniforms[location], !!transpose, view)
    }
    function _glUniformMatrix3fv(location, count, transpose, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniformMatrix3fv(GL.uniforms[location], !!transpose, HEAPF32, value >> 2, count * 9)
        return
      }
      if (9 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferFloatViews[9 * count - 1]
        for (var i = 0; i < 9 * count; i += 9) {
          view[i] = HEAPF32[(value + 4 * i) >> 2]
          view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
          view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2]
          view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2]
          view[i + 4] = HEAPF32[(value + (4 * i + 16)) >> 2]
          view[i + 5] = HEAPF32[(value + (4 * i + 20)) >> 2]
          view[i + 6] = HEAPF32[(value + (4 * i + 24)) >> 2]
          view[i + 7] = HEAPF32[(value + (4 * i + 28)) >> 2]
          view[i + 8] = HEAPF32[(value + (4 * i + 32)) >> 2]
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 36) >> 2)
      }
      GLctx.uniformMatrix3fv(GL.uniforms[location], !!transpose, view)
    }
    function _glUniformMatrix4fv(location, count, transpose, value) {
      if (GL.currentContext.version >= 2) {
        GLctx.uniformMatrix4fv(GL.uniforms[location], !!transpose, HEAPF32, value >> 2, count * 16)
        return
      }
      if (16 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferFloatViews[16 * count - 1]
        for (var i = 0; i < 16 * count; i += 16) {
          view[i] = HEAPF32[(value + 4 * i) >> 2]
          view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
          view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2]
          view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2]
          view[i + 4] = HEAPF32[(value + (4 * i + 16)) >> 2]
          view[i + 5] = HEAPF32[(value + (4 * i + 20)) >> 2]
          view[i + 6] = HEAPF32[(value + (4 * i + 24)) >> 2]
          view[i + 7] = HEAPF32[(value + (4 * i + 28)) >> 2]
          view[i + 8] = HEAPF32[(value + (4 * i + 32)) >> 2]
          view[i + 9] = HEAPF32[(value + (4 * i + 36)) >> 2]
          view[i + 10] = HEAPF32[(value + (4 * i + 40)) >> 2]
          view[i + 11] = HEAPF32[(value + (4 * i + 44)) >> 2]
          view[i + 12] = HEAPF32[(value + (4 * i + 48)) >> 2]
          view[i + 13] = HEAPF32[(value + (4 * i + 52)) >> 2]
          view[i + 14] = HEAPF32[(value + (4 * i + 56)) >> 2]
          view[i + 15] = HEAPF32[(value + (4 * i + 60)) >> 2]
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 64) >> 2)
      }
      GLctx.uniformMatrix4fv(GL.uniforms[location], !!transpose, view)
    }
    function _glUseProgram(program) {
      GLctx.useProgram(GL.programs[program])
    }
    function _glVertexAttrib4f(x0, x1, x2, x3, x4) {
      GLctx['vertexAttrib4f'](x0, x1, x2, x3, x4)
    }
    function _glVertexAttrib4fv(index, v) {
      GLctx.vertexAttrib4f(
        index,
        HEAPF32[v >> 2],
        HEAPF32[(v + 4) >> 2],
        HEAPF32[(v + 8) >> 2],
        HEAPF32[(v + 12) >> 2]
      )
    }
    function _glVertexAttribDivisor(index, divisor) {
      GLctx['vertexAttribDivisor'](index, divisor)
    }
    function _glVertexAttribI4ui(x0, x1, x2, x3, x4) {
      GLctx['vertexAttribI4ui'](x0, x1, x2, x3, x4)
    }
    function _glVertexAttribIPointer(index, size, type, stride, ptr) {
      GLctx['vertexAttribIPointer'](index, size, type, stride, ptr)
    }
    function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr)
    }
    function _glViewport(x0, x1, x2, x3) {
      GLctx['viewport'](x0, x1, x2, x3)
    }
    var ___tm_timezone = (stringToUTF8('GMT', 3502432, 4), 3502432)
    function _gmtime_r(time, tmPtr) {
      var date = new Date(HEAP32[time >> 2] * 1e3)
      HEAP32[tmPtr >> 2] = date.getUTCSeconds()
      HEAP32[(tmPtr + 4) >> 2] = date.getUTCMinutes()
      HEAP32[(tmPtr + 8) >> 2] = date.getUTCHours()
      HEAP32[(tmPtr + 12) >> 2] = date.getUTCDate()
      HEAP32[(tmPtr + 16) >> 2] = date.getUTCMonth()
      HEAP32[(tmPtr + 20) >> 2] = date.getUTCFullYear() - 1900
      HEAP32[(tmPtr + 24) >> 2] = date.getUTCDay()
      HEAP32[(tmPtr + 36) >> 2] = 0
      HEAP32[(tmPtr + 32) >> 2] = 0
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0)
      var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0
      HEAP32[(tmPtr + 28) >> 2] = yday
      HEAP32[(tmPtr + 40) >> 2] = ___tm_timezone
      return tmPtr
    }
    var GodotRuntime = {
      get_func: function (ptr) {
        return wasmTable.get(ptr)
      },
      error: function () {
        err.apply(null, Array.from(arguments))
      },
      print: function () {
        out.apply(null, Array.from(arguments))
      },
      malloc: function (p_size) {
        return _malloc(p_size)
      },
      free: function (p_ptr) {
        _free(p_ptr)
      },
      getHeapValue: function (p_ptr, p_type) {
        return getValue(p_ptr, p_type)
      },
      setHeapValue: function (p_ptr, p_value, p_type) {
        setValue(p_ptr, p_value, p_type)
      },
      heapSub: function (p_heap, p_ptr, p_len) {
        const bytes = p_heap.BYTES_PER_ELEMENT
        return p_heap.subarray(p_ptr / bytes, p_ptr / bytes + p_len)
      },
      heapSlice: function (p_heap, p_ptr, p_len) {
        const bytes = p_heap.BYTES_PER_ELEMENT
        return p_heap.slice(p_ptr / bytes, p_ptr / bytes + p_len)
      },
      heapCopy: function (p_dst, p_src, p_ptr) {
        const bytes = p_src.BYTES_PER_ELEMENT
        return p_dst.set(p_src, p_ptr / bytes)
      },
      parseString: function (p_ptr) {
        return UTF8ToString(p_ptr)
      },
      parseStringArray: function (p_ptr, p_size) {
        const strings = []
        const ptrs = GodotRuntime.heapSub(HEAP32, p_ptr, p_size)
        ptrs.forEach(function (ptr) {
          strings.push(GodotRuntime.parseString(ptr))
        })
        return strings
      },
      strlen: function (p_str) {
        return lengthBytesUTF8(p_str)
      },
      allocString: function (p_str) {
        const length = GodotRuntime.strlen(p_str) + 1
        const c_str = GodotRuntime.malloc(length)
        stringToUTF8(p_str, c_str, length)
        return c_str
      },
      allocStringArray: function (p_strings) {
        const size = p_strings.length
        const c_ptr = GodotRuntime.malloc(size * 4)
        for (let i = 0; i < size; i++) {
          HEAP32[(c_ptr >> 2) + i] = GodotRuntime.allocString(p_strings[i])
        }
        return c_ptr
      },
      freeStringArray: function (p_ptr, p_len) {
        for (let i = 0; i < p_len; i++) {
          GodotRuntime.free(HEAP32[(p_ptr >> 2) + i])
        }
        GodotRuntime.free(p_ptr)
      },
      stringToHeap: function (p_str, p_ptr, p_len) {
        return stringToUTF8Array(p_str, HEAP8, p_ptr, p_len)
      }
    }
    var GodotConfig = {
      canvas: null,
      locale: 'en',
      canvas_resize_policy: 2,
      virtual_keyboard: false,
      persistent_drops: false,
      on_execute: null,
      on_exit: null,
      init_config: function (p_opts) {
        GodotConfig.canvas_resize_policy = p_opts['canvasResizePolicy']
        GodotConfig.canvas = p_opts['canvas']
        GodotConfig.locale = p_opts['locale'] || GodotConfig.locale
        GodotConfig.virtual_keyboard = p_opts['virtualKeyboard']
        GodotConfig.persistent_drops = !!p_opts['persistentDrops']
        GodotConfig.on_execute = p_opts['onExecute']
        GodotConfig.on_exit = p_opts['onExit']
        if (p_opts['focusCanvas']) {
          GodotConfig.canvas.focus()
        }
      },
      locate_file: function (file) {
        return Module['locateFile'](file)
      },
      clear: function () {
        GodotConfig.canvas = null
        GodotConfig.locale = 'en'
        GodotConfig.canvas_resize_policy = 2
        GodotConfig.virtual_keyboard = false
        GodotConfig.persistent_drops = false
        GodotConfig.on_execute = null
        GodotConfig.on_exit = null
      }
    }
    var GodotFS = {
      _idbfs: false,
      _syncing: false,
      _mount_points: [],
      is_persistent: function () {
        return GodotFS._idbfs ? 1 : 0
      },
      init: function (persistentPaths) {
        GodotFS._idbfs = false
        if (!Array.isArray(persistentPaths)) {
          return Promise.reject(new Error('Persistent paths must be an array'))
        }
        if (!persistentPaths.length) {
          return Promise.resolve()
        }
        GodotFS._mount_points = persistentPaths.slice()
        function createRecursive(dir) {
          try {
            FS.stat(dir)
          } catch (e) {
            if (e.errno !== ERRNO_CODES.ENOENT) {
              throw e
            }
            FS.mkdirTree(dir)
          }
        }
        GodotFS._mount_points.forEach(function (path) {
          createRecursive(path)
          FS.mount(IDBFS, {}, path)
        })
        return new Promise(function (resolve, reject) {
          FS.syncfs(true, function (err) {
            if (err) {
              GodotFS._mount_points = []
              GodotFS._idbfs = false
              GodotRuntime.print(`IndexedDB not available: ${err.message}`)
            } else {
              GodotFS._idbfs = true
            }
            resolve(err)
          })
        })
      },
      deinit: function () {
        GodotFS._mount_points.forEach(function (path) {
          try {
            FS.unmount(path)
          } catch (e) {
            GodotRuntime.print('Already unmounted', e)
          }
          if (GodotFS._idbfs && IDBFS.dbs[path]) {
            IDBFS.dbs[path].close()
            delete IDBFS.dbs[path]
          }
        })
        GodotFS._mount_points = []
        GodotFS._idbfs = false
        GodotFS._syncing = false
      },
      sync: function () {
        if (GodotFS._syncing) {
          GodotRuntime.error('Already syncing!')
          return Promise.resolve()
        }
        GodotFS._syncing = true
        return new Promise(function (resolve, reject) {
          FS.syncfs(false, function (error) {
            if (error) {
              GodotRuntime.error(`Failed to save IDB file system: ${error.message}`)
            }
            GodotFS._syncing = false
            resolve(error)
          })
        })
      },
      copy_to_fs: function (path, buffer) {
        const idx = path.lastIndexOf('/')
        let dir = '/'
        if (idx > 0) {
          dir = path.slice(0, idx)
        }
        try {
          FS.stat(dir)
        } catch (e) {
          if (e.errno !== ERRNO_CODES.ENOENT) {
            throw e
          }
          FS.mkdirTree(dir)
        }
        FS.writeFile(path, new Uint8Array(buffer))
      }
    }
    var GodotOS = {
      request_quit: function () {},
      _async_cbs: [],
      _fs_sync_promise: null,
      atexit: function (p_promise_cb) {
        GodotOS._async_cbs.push(p_promise_cb)
      },
      cleanup: function (exit_code) {
        const cb = GodotConfig.on_exit
        GodotFS.deinit()
        GodotConfig.clear()
        if (cb) {
          cb(exit_code)
        }
      },
      finish_async: function (callback) {
        GodotOS._fs_sync_promise
          .then(function (err) {
            const promises = []
            GodotOS._async_cbs.forEach(function (cb) {
              promises.push(new Promise(cb))
            })
            return Promise.all(promises)
          })
          .then(function () {
            return GodotFS.sync()
          })
          .then(function (err) {
            setTimeout(function () {
              callback()
            }, 0)
          })
      }
    }
    var GodotAudio = {
      ctx: null,
      input: null,
      driver: null,
      interval: 0,
      init: function (mix_rate, latency, onstatechange, onlatencyupdate) {
        const opts = {}
        if (mix_rate) {
          opts['sampleRate'] = mix_rate
        }
        const ctx = new (window.AudioContext || window.webkitAudioContext)(opts)
        GodotAudio.ctx = ctx
        ctx.onstatechange = function () {
          let state = 0
          switch (ctx.state) {
            case 'suspended':
              state = 0
              break
            case 'running':
              state = 1
              break
            case 'closed':
              state = 2
              break
          }
          onstatechange(state)
        }
        ctx.onstatechange()
        GodotAudio.interval = setInterval(function () {
          let computed_latency = 0
          if (ctx.baseLatency) {
            computed_latency += GodotAudio.ctx.baseLatency
          }
          if (ctx.outputLatency) {
            computed_latency += GodotAudio.ctx.outputLatency
          }
          onlatencyupdate(computed_latency)
        }, 1e3)
        GodotOS.atexit(GodotAudio.close_async)
        return ctx.destination.channelCount
      },
      create_input: function (callback) {
        if (GodotAudio.input) {
          return 0
        }
        function gotMediaInput(stream) {
          try {
            GodotAudio.input = GodotAudio.ctx.createMediaStreamSource(stream)
            callback(GodotAudio.input)
          } catch (e) {
            GodotRuntime.error('Failed creaating input.', e)
          }
        }
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ audio: true }).then(gotMediaInput, function (e) {
            GodotRuntime.error('Error getting user media.', e)
          })
        } else {
          if (!navigator.getUserMedia) {
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia
          }
          if (!navigator.getUserMedia) {
            GodotRuntime.error('getUserMedia not available.')
            return 1
          }
          navigator.getUserMedia({ audio: true }, gotMediaInput, function (e) {
            GodotRuntime.print(e)
          })
        }
        return 0
      },
      close_async: function (resolve, reject) {
        const ctx = GodotAudio.ctx
        GodotAudio.ctx = null
        if (!ctx) {
          resolve()
          return
        }
        if (GodotAudio.interval) {
          clearInterval(GodotAudio.interval)
          GodotAudio.interval = 0
        }
        if (GodotAudio.input) {
          GodotAudio.input.disconnect()
          GodotAudio.input = null
        }
        let closed = Promise.resolve()
        if (GodotAudio.driver) {
          closed = GodotAudio.driver.close()
        }
        closed
          .then(function () {
            return ctx.close()
          })
          .then(function () {
            ctx.onstatechange = null
            resolve()
          })
          .catch(function (e) {
            ctx.onstatechange = null
            GodotRuntime.error('Error closing AudioContext', e)
            resolve()
          })
      }
    }
    function _godot_audio_capture_start() {
      return GodotAudio.create_input(function (input) {
        input.connect(GodotAudio.driver.get_node())
      })
    }
    function _godot_audio_capture_stop() {
      if (GodotAudio.input) {
        const tracks = GodotAudio.input['mediaStream']['getTracks']()
        for (let i = 0; i < tracks.length; i++) {
          tracks[i]['stop']()
        }
        GodotAudio.input.disconnect()
        GodotAudio.input = null
      }
    }
    function _godot_audio_has_script_processor() {
      return GodotAudio.ctx && GodotAudio.ctx.createScriptProcessor ? 1 : 0
    }
    function _godot_audio_has_worklet() {
      return GodotAudio.ctx && GodotAudio.ctx.audioWorklet ? 1 : 0
    }
    function _godot_audio_init(p_mix_rate, p_latency, p_state_change, p_latency_update) {
      const statechange = GodotRuntime.get_func(p_state_change)
      const latencyupdate = GodotRuntime.get_func(p_latency_update)
      const mix_rate = GodotRuntime.getHeapValue(p_mix_rate, 'i32')
      const channels = GodotAudio.init(mix_rate, p_latency, statechange, latencyupdate)
      GodotRuntime.setHeapValue(p_mix_rate, GodotAudio.ctx.sampleRate, 'i32')
      return channels
    }
    function _godot_audio_is_available() {
      if (!(window.AudioContext || window.webkitAudioContext)) {
        return 0
      }
      return 1
    }
    function _godot_audio_resume() {
      if (GodotAudio.ctx && GodotAudio.ctx.state !== 'running') {
        GodotAudio.ctx.resume()
      }
    }
    var GodotAudioScript = {
      script: null,
      create: function (buffer_length, channel_count) {
        GodotAudioScript.script = GodotAudio.ctx.createScriptProcessor(
          buffer_length,
          2,
          channel_count
        )
        GodotAudio.driver = GodotAudioScript
        return GodotAudioScript.script.bufferSize
      },
      start: function (p_in_buf, p_in_size, p_out_buf, p_out_size, onprocess) {
        GodotAudioScript.script.onaudioprocess = function (event) {
          const inb = GodotRuntime.heapSub(HEAPF32, p_in_buf, p_in_size)
          const input = event.inputBuffer
          if (GodotAudio.input) {
            const inlen = input.getChannelData(0).length
            for (let ch = 0; ch < 2; ch++) {
              const data = input.getChannelData(ch)
              for (let s = 0; s < inlen; s++) {
                inb[s * 2 + ch] = data[s]
              }
            }
          }
          onprocess()
          const outb = GodotRuntime.heapSub(HEAPF32, p_out_buf, p_out_size)
          const output = event.outputBuffer
          const channels = output.numberOfChannels
          for (let ch = 0; ch < channels; ch++) {
            const data = output.getChannelData(ch)
            for (let sample = 0; sample < data.length; sample++) {
              data[sample] = outb[sample * channels + ch]
            }
          }
        }
        GodotAudioScript.script.connect(GodotAudio.ctx.destination)
      },
      get_node: function () {
        return GodotAudioScript.script
      },
      close: function () {
        return new Promise(function (resolve, reject) {
          GodotAudioScript.script.disconnect()
          GodotAudioScript.script.onaudioprocess = null
          GodotAudioScript.script = null
          resolve()
        })
      }
    }
    function _godot_audio_script_create(buffer_length, channel_count) {
      const buf_len = GodotRuntime.getHeapValue(buffer_length, 'i32')
      try {
        const out_len = GodotAudioScript.create(buf_len, channel_count)
        GodotRuntime.setHeapValue(buffer_length, out_len, 'i32')
      } catch (e) {
        GodotRuntime.error('Error starting AudioDriverScriptProcessor', e)
        return 1
      }
      return 0
    }
    function _godot_audio_script_start(p_in_buf, p_in_size, p_out_buf, p_out_size, p_cb) {
      const onprocess = GodotRuntime.get_func(p_cb)
      GodotAudioScript.start(p_in_buf, p_in_size, p_out_buf, p_out_size, onprocess)
    }
    var GodotAudioWorklet = {
      promise: null,
      worklet: null,
      ring_buffer: null,
      create: function (channels) {
        const path = GodotConfig.locate_file('godot.audio.worklet.js')
        GodotAudioWorklet.promise = GodotAudio.ctx.audioWorklet.addModule(path).then(function () {
          GodotAudioWorklet.worklet = new AudioWorkletNode(GodotAudio.ctx, 'godot-processor', {
            outputChannelCount: [channels]
          })
          return Promise.resolve()
        })
        GodotAudio.driver = GodotAudioWorklet
      },
      start: function (in_buf, out_buf, state) {
        GodotAudioWorklet.promise.then(function () {
          const node = GodotAudioWorklet.worklet
          node.connect(GodotAudio.ctx.destination)
          node.port.postMessage({ cmd: 'start', data: [state, in_buf, out_buf] })
          node.port.onmessage = function (event) {
            GodotRuntime.error(event.data)
          }
        })
      },
      start_no_threads: function (
        p_out_buf,
        p_out_size,
        out_callback,
        p_in_buf,
        p_in_size,
        in_callback
      ) {
        function RingBuffer() {
          let wpos = 0
          let rpos = 0
          let pending_samples = 0
          const wbuf = new Float32Array(p_out_size)
          function send(port) {
            if (pending_samples === 0) {
              return
            }
            const buffer = GodotRuntime.heapSub(HEAPF32, p_out_buf, p_out_size)
            const size = buffer.length
            const tot_sent = pending_samples
            out_callback(wpos, pending_samples)
            if (wpos + pending_samples >= size) {
              const high = size - wpos
              wbuf.set(buffer.subarray(wpos, size))
              pending_samples -= high
              wpos = 0
            }
            if (pending_samples > 0) {
              wbuf.set(buffer.subarray(wpos, wpos + pending_samples), tot_sent - pending_samples)
            }
            port.postMessage({ cmd: 'chunk', data: wbuf.subarray(0, tot_sent) })
            wpos += pending_samples
            pending_samples = 0
          }
          this.receive = function (recv_buf) {
            const buffer = GodotRuntime.heapSub(HEAPF32, p_in_buf, p_in_size)
            const from = rpos
            let to_write = recv_buf.length
            let high = 0
            if (rpos + to_write >= p_in_size) {
              high = p_in_size - rpos
              buffer.set(recv_buf.subarray(0, high), rpos)
              to_write -= high
              rpos = 0
            }
            if (to_write) {
              buffer.set(recv_buf.subarray(high, to_write), rpos)
            }
            in_callback(from, recv_buf.length)
            rpos += to_write
          }
          this.consumed = function (size, port) {
            pending_samples += size
            send(port)
          }
        }
        GodotAudioWorklet.ring_buffer = new RingBuffer()
        GodotAudioWorklet.promise.then(function () {
          const node = GodotAudioWorklet.worklet
          const buffer = GodotRuntime.heapSlice(HEAPF32, p_out_buf, p_out_size)
          node.connect(GodotAudio.ctx.destination)
          node.port.postMessage({ cmd: 'start_nothreads', data: [buffer, p_in_size] })
          node.port.onmessage = function (event) {
            if (!GodotAudioWorklet.worklet) {
              return
            }
            if (event.data['cmd'] === 'read') {
              const read = event.data['data']
              GodotAudioWorklet.ring_buffer.consumed(read, GodotAudioWorklet.worklet.port)
            } else if (event.data['cmd'] === 'input') {
              const buf = event.data['data']
              if (buf.length > p_in_size) {
                GodotRuntime.error('Input chunk is too big')
                return
              }
              GodotAudioWorklet.ring_buffer.receive(buf)
            } else {
              GodotRuntime.error(event.data)
            }
          }
        })
      },
      get_node: function () {
        return GodotAudioWorklet.worklet
      },
      close: function () {
        return new Promise(function (resolve, reject) {
          if (GodotAudioWorklet.promise === null) {
            return
          }
          GodotAudioWorklet.promise
            .then(function () {
              GodotAudioWorklet.worklet.port.postMessage({ cmd: 'stop', data: null })
              GodotAudioWorklet.worklet.disconnect()
              GodotAudioWorklet.worklet = null
              GodotAudioWorklet.promise = null
              resolve()
            })
            .catch(function (err) {})
        })
      }
    }
    function _godot_audio_worklet_create(channels) {
      try {
        GodotAudioWorklet.create(channels)
      } catch (e) {
        GodotRuntime.error('Error starting AudioDriverWorklet', e)
        return 1
      }
      return 0
    }
    function _godot_audio_worklet_start_no_threads(
      p_out_buf,
      p_out_size,
      p_out_callback,
      p_in_buf,
      p_in_size,
      p_in_callback
    ) {
      const out_callback = GodotRuntime.get_func(p_out_callback)
      const in_callback = GodotRuntime.get_func(p_in_callback)
      GodotAudioWorklet.start_no_threads(
        p_out_buf,
        p_out_size,
        out_callback,
        p_in_buf,
        p_in_size,
        in_callback
      )
    }
    function _godot_js_config_canvas_id_get(p_ptr, p_ptr_max) {
      GodotRuntime.stringToHeap(`#${GodotConfig.canvas.id}`, p_ptr, p_ptr_max)
    }
    function _godot_js_config_locale_get(p_ptr, p_ptr_max) {
      GodotRuntime.stringToHeap(GodotConfig.locale, p_ptr, p_ptr_max)
    }
    var GodotDisplayCursor = {
      shape: 'auto',
      visible: true,
      cursors: {},
      set_style: function (style) {
        GodotConfig.canvas.style.cursor = style
      },
      set_shape: function (shape) {
        GodotDisplayCursor.shape = shape
        let css = shape
        if (shape in GodotDisplayCursor.cursors) {
          const c = GodotDisplayCursor.cursors[shape]
          css = `url("${c.url}") ${c.x} ${c.y}, auto`
        }
        if (GodotDisplayCursor.visible) {
          GodotDisplayCursor.set_style(css)
        }
      },
      clear: function () {
        GodotDisplayCursor.set_style('')
        GodotDisplayCursor.shape = 'auto'
        GodotDisplayCursor.visible = true
        Object.keys(GodotDisplayCursor.cursors).forEach(function (key) {
          URL.revokeObjectURL(GodotDisplayCursor.cursors[key])
          delete GodotDisplayCursor.cursors[key]
        })
      },
      lockPointer: function () {
        const canvas = GodotConfig.canvas
        if (canvas.requestPointerLock) {
          canvas.requestPointerLock()
        }
      },
      releasePointer: function () {
        if (document.exitPointerLock) {
          document.exitPointerLock()
        }
      },
      isPointerLocked: function () {
        return document.pointerLockElement === GodotConfig.canvas
      }
    }
    var GodotEventListeners = {
      handlers: [],
      has: function (target, event, method, capture) {
        return (
          GodotEventListeners.handlers.findIndex(function (e) {
            return (
              e.target === target &&
              e.event === event &&
              e.method === method &&
              e.capture === capture
            )
          }) !== -1
        )
      },
      add: function (target, event, method, capture) {
        if (GodotEventListeners.has(target, event, method, capture)) {
          return
        }
        function Handler(p_target, p_event, p_method, p_capture) {
          this.target = p_target
          this.event = p_event
          this.method = p_method
          this.capture = p_capture
        }
        GodotEventListeners.handlers.push(new Handler(target, event, method, capture))
        target.addEventListener(event, method, capture)
      },
      clear: function () {
        GodotEventListeners.handlers.forEach(function (h) {
          h.target.removeEventListener(h.event, h.method, h.capture)
        })
        GodotEventListeners.handlers.length = 0
      }
    }
    function _emscripten_webgl_do_get_current_context() {
      return GL.currentContext ? GL.currentContext.handle : 0
    }
    function _emscripten_webgl_get_current_context() {
      return _emscripten_webgl_do_get_current_context()
    }
    Module['_emscripten_webgl_get_current_context'] = _emscripten_webgl_get_current_context
    var GodotDisplayScreen = {
      desired_size: [0, 0],
      hidpi: true,
      getPixelRatio: function () {
        return GodotDisplayScreen.hidpi ? window.devicePixelRatio || 1 : 1
      },
      isFullscreen: function () {
        const elem =
          document.fullscreenElement ||
          document.mozFullscreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
        if (elem) {
          return elem === GodotConfig.canvas
        }
        return document.fullscreen || document.mozFullScreen || document.webkitIsFullscreen
      },
      hasFullscreen: function () {
        return (
          document.fullscreenEnabled ||
          document.mozFullScreenEnabled ||
          document.webkitFullscreenEnabled
        )
      },
      requestFullscreen: function () {
        if (!GodotDisplayScreen.hasFullscreen()) {
          return 1
        }
        const canvas = GodotConfig.canvas
        try {
          const promise = (
            canvas.requestFullscreen ||
            canvas.msRequestFullscreen ||
            canvas.mozRequestFullScreen ||
            canvas.mozRequestFullscreen ||
            canvas.webkitRequestFullscreen
          ).call(canvas)
          if (promise) {
            promise.catch(function () {})
          }
        } catch (e) {
          return 1
        }
        return 0
      },
      exitFullscreen: function () {
        if (!GodotDisplayScreen.isFullscreen()) {
          return 0
        }
        try {
          const promise = document.exitFullscreen()
          if (promise) {
            promise.catch(function () {})
          }
        } catch (e) {
          return 1
        }
        return 0
      },
      _updateGL: function () {
        const gl_context_handle = _emscripten_webgl_get_current_context()
        const gl = GL.getContext(gl_context_handle)
        if (gl) {
          GL.resizeOffscreenFramebuffer(gl)
        }
      },
      updateSize: function () {
        const isFullscreen = GodotDisplayScreen.isFullscreen()
        const wantsFullWindow = GodotConfig.canvas_resize_policy === 2
        const noResize = GodotConfig.canvas_resize_policy === 0
        const wwidth = GodotDisplayScreen.desired_size[0]
        const wheight = GodotDisplayScreen.desired_size[1]
        const canvas = GodotConfig.canvas
        let width = wwidth
        let height = wheight
        if (noResize) {
          if (canvas.width !== width || canvas.height !== height) {
            GodotDisplayScreen.desired_size = [canvas.width, canvas.height]
            GodotDisplayScreen._updateGL()
            return 1
          }
          return 0
        }
        const scale = GodotDisplayScreen.getPixelRatio()
        if (isFullscreen || wantsFullWindow) {
          width = window.innerWidth * scale
          height = window.innerHeight * scale
        }
        const csw = `${width / scale}px`
        const csh = `${height / scale}px`
        if (
          canvas.style.width !== csw ||
          canvas.style.height !== csh ||
          canvas.width !== width ||
          canvas.height !== height
        ) {
          canvas.width = width
          canvas.height = height
          canvas.style.width = csw
          canvas.style.height = csh
          GodotDisplayScreen._updateGL()
          return 1
        }
        return 0
      }
    }
    var GodotDisplayVK = {
      textinput: null,
      textarea: null,
      available: function () {
        return GodotConfig.virtual_keyboard && 'ontouchstart' in window
      },
      init: function (input_cb) {
        function create(what) {
          const elem = document.createElement(what)
          elem.style.display = 'none'
          elem.style.position = 'absolute'
          elem.style.zIndex = '-1'
          elem.style.background = 'transparent'
          elem.style.padding = '0px'
          elem.style.margin = '0px'
          elem.style.overflow = 'hidden'
          elem.style.width = '0px'
          elem.style.height = '0px'
          elem.style.border = '0px'
          elem.style.outline = 'none'
          elem.readonly = true
          elem.disabled = true
          GodotEventListeners.add(
            elem,
            'input',
            function (evt) {
              const c_str = GodotRuntime.allocString(elem.value)
              input_cb(c_str, elem.selectionEnd)
              GodotRuntime.free(c_str)
            },
            false
          )
          GodotEventListeners.add(
            elem,
            'blur',
            function (evt) {
              elem.style.display = 'none'
              elem.readonly = true
              elem.disabled = true
            },
            false
          )
          GodotConfig.canvas.insertAdjacentElement('beforebegin', elem)
          return elem
        }
        GodotDisplayVK.textinput = create('input')
        GodotDisplayVK.textarea = create('textarea')
        GodotDisplayVK.updateSize()
      },
      show: function (text, multiline, start, end) {
        if (!GodotDisplayVK.textinput || !GodotDisplayVK.textarea) {
          return
        }
        if (
          GodotDisplayVK.textinput.style.display !== '' ||
          GodotDisplayVK.textarea.style.display !== ''
        ) {
          GodotDisplayVK.hide()
        }
        GodotDisplayVK.updateSize()
        const elem = multiline ? GodotDisplayVK.textarea : GodotDisplayVK.textinput
        elem.readonly = false
        elem.disabled = false
        elem.value = text
        elem.style.display = 'block'
        elem.focus()
        elem.setSelectionRange(start, end)
      },
      hide: function () {
        if (!GodotDisplayVK.textinput || !GodotDisplayVK.textarea) {
          return
        }
        ;[GodotDisplayVK.textinput, GodotDisplayVK.textarea].forEach(function (elem) {
          elem.blur()
          elem.style.display = 'none'
          elem.value = ''
        })
      },
      updateSize: function () {
        if (!GodotDisplayVK.textinput || !GodotDisplayVK.textarea) {
          return
        }
        const rect = GodotConfig.canvas.getBoundingClientRect()
        function update(elem) {
          elem.style.left = `${rect.left}px`
          elem.style.top = `${rect.top}px`
          elem.style.width = `${rect.width}px`
          elem.style.height = `${rect.height}px`
        }
        update(GodotDisplayVK.textinput)
        update(GodotDisplayVK.textarea)
      },
      clear: function () {
        if (GodotDisplayVK.textinput) {
          GodotDisplayVK.textinput.remove()
          GodotDisplayVK.textinput = null
        }
        if (GodotDisplayVK.textarea) {
          GodotDisplayVK.textarea.remove()
          GodotDisplayVK.textarea = null
        }
      }
    }
    var GodotDisplay = {
      window_icon: '',
      findDPI: function () {
        function testDPI(dpi) {
          return window.matchMedia(`(max-resolution: ${dpi}dpi)`).matches
        }
        function bisect(low, high, func) {
          const mid = parseInt((high - low) / 2 + low, 10)
          if (high - low <= 1) {
            return func(high) ? high : low
          }
          if (func(mid)) {
            return bisect(low, mid, func)
          }
          return bisect(mid, high, func)
        }
        try {
          const dpi = bisect(0, 800, testDPI)
          return dpi >= 96 ? dpi : 96
        } catch (e) {
          return 96
        }
      }
    }
    function _godot_js_display_alert(p_text) {
      window.alert(GodotRuntime.parseString(p_text))
    }
    function _godot_js_display_canvas_focus() {
      GodotConfig.canvas.focus()
    }
    function _godot_js_display_canvas_is_focused() {
      return document.activeElement === GodotConfig.canvas
    }
    function _godot_js_display_clipboard_get(callback) {
      const func = GodotRuntime.get_func(callback)
      try {
        navigator.clipboard
          .readText()
          .then(function (result) {
            const ptr = GodotRuntime.allocString(result)
            func(ptr)
            GodotRuntime.free(ptr)
          })
          .catch(function (e) {})
      } catch (e) {}
    }
    function _godot_js_display_clipboard_set(p_text) {
      const text = GodotRuntime.parseString(p_text)
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        return 1
      }
      navigator.clipboard.writeText(text).catch(function (e) {
        GodotRuntime.error(
          'Setting OS clipboard is only possible from an input callback for the HTML5 plafrom. Exception:',
          e
        )
      })
      return 0
    }
    function _godot_js_display_cursor_is_hidden() {
      return !GodotDisplayCursor.visible
    }
    function _godot_js_display_cursor_is_locked() {
      return GodotDisplayCursor.isPointerLocked() ? 1 : 0
    }
    function _godot_js_display_cursor_lock_set(p_lock) {
      if (p_lock) {
        GodotDisplayCursor.lockPointer()
      } else {
        GodotDisplayCursor.releasePointer()
      }
    }
    function _godot_js_display_cursor_set_custom_shape(
      p_shape,
      p_ptr,
      p_len,
      p_hotspot_x,
      p_hotspot_y
    ) {
      const shape = GodotRuntime.parseString(p_shape)
      const old_shape = GodotDisplayCursor.cursors[shape]
      if (p_len > 0) {
        const png = new Blob([GodotRuntime.heapSlice(HEAPU8, p_ptr, p_len)], { type: 'image/png' })
        const url = URL.createObjectURL(png)
        GodotDisplayCursor.cursors[shape] = { url: url, x: p_hotspot_x, y: p_hotspot_y }
      } else {
        delete GodotDisplayCursor.cursors[shape]
      }
      if (shape === GodotDisplayCursor.shape) {
        GodotDisplayCursor.set_shape(GodotDisplayCursor.shape)
      }
      if (old_shape) {
        URL.revokeObjectURL(old_shape.url)
      }
    }
    function _godot_js_display_cursor_set_shape(p_string) {
      GodotDisplayCursor.set_shape(GodotRuntime.parseString(p_string))
    }
    function _godot_js_display_cursor_set_visible(p_visible) {
      const visible = p_visible !== 0
      if (visible === GodotDisplayCursor.visible) {
        return
      }
      GodotDisplayCursor.visible = visible
      if (visible) {
        GodotDisplayCursor.set_shape(GodotDisplayCursor.shape)
      } else {
        GodotDisplayCursor.set_style('none')
      }
    }
    function _godot_js_display_desired_size_set(width, height) {
      GodotDisplayScreen.desired_size = [width, height]
      GodotDisplayScreen.updateSize()
    }
    function _godot_js_display_fullscreen_cb(callback) {
      const canvas = GodotConfig.canvas
      const func = GodotRuntime.get_func(callback)
      function change_cb(evt) {
        if (evt.target === canvas) {
          func(GodotDisplayScreen.isFullscreen())
        }
      }
      GodotEventListeners.add(document, 'fullscreenchange', change_cb, false)
      GodotEventListeners.add(document, 'mozfullscreenchange', change_cb, false)
      GodotEventListeners.add(document, 'webkitfullscreenchange', change_cb, false)
    }
    function _godot_js_display_fullscreen_exit() {
      return GodotDisplayScreen.exitFullscreen()
    }
    function _godot_js_display_fullscreen_request() {
      return GodotDisplayScreen.requestFullscreen()
    }
    function _godot_js_display_glGetBufferSubData(target, offset, size, data) {
      const gl_context_handle = _emscripten_webgl_get_current_context()
      const gl = GL.getContext(gl_context_handle)
      if (gl) {
        gl.GLctx['getBufferSubData'](target, offset, HEAPU8, data, size)
      }
    }
    function _godot_js_display_has_webgl(p_version) {
      if (p_version !== 1 && p_version !== 2) {
        return false
      }
      try {
        return !!document.createElement('canvas').getContext(p_version === 2 ? 'webgl2' : 'webgl')
      } catch (e) {}
      return false
    }
    function _godot_js_display_is_swap_ok_cancel() {
      const win = ['Windows', 'Win64', 'Win32', 'WinCE']
      const plat = navigator.platform || ''
      if (win.indexOf(plat) !== -1) {
        return 1
      }
      return 0
    }
    function _godot_js_display_notification_cb(callback, p_enter, p_exit, p_in, p_out) {
      const canvas = GodotConfig.canvas
      const func = GodotRuntime.get_func(callback)
      const notif = [p_enter, p_exit, p_in, p_out]
      ;['mouseover', 'mouseleave', 'focus', 'blur'].forEach(function (evt_name, idx) {
        GodotEventListeners.add(
          canvas,
          evt_name,
          function () {
            func(notif[idx])
          },
          true
        )
      })
    }
    function _godot_js_display_pixel_ratio_get() {
      return GodotDisplayScreen.getPixelRatio()
    }
    function _godot_js_display_screen_dpi_get() {
      return GodotDisplay.findDPI()
    }
    function _godot_js_display_screen_size_get(width, height) {
      const scale = GodotDisplayScreen.getPixelRatio()
      GodotRuntime.setHeapValue(width, window.screen.width * scale, 'i32')
      GodotRuntime.setHeapValue(height, window.screen.height * scale, 'i32')
    }
    function _godot_js_display_setup_canvas(p_width, p_height, p_fullscreen, p_hidpi) {
      const canvas = GodotConfig.canvas
      GodotEventListeners.add(
        canvas,
        'contextmenu',
        function (ev) {
          ev.preventDefault()
        },
        false
      )
      GodotEventListeners.add(
        canvas,
        'webglcontextlost',
        function (ev) {
          alert('WebGL context lost, please reload the page')
          ev.preventDefault()
        },
        false
      )
      GodotDisplayScreen.hidpi = !!p_hidpi
      switch (GodotConfig.canvas_resize_policy) {
        case 0:
          GodotDisplayScreen.desired_size = [canvas.width, canvas.height]
          break
        case 1:
          GodotDisplayScreen.desired_size = [p_width, p_height]
          break
        default:
          canvas.style.position = 'absolute'
          canvas.style.top = 0
          canvas.style.left = 0
          break
      }
      GodotDisplayScreen.updateSize()
      if (p_fullscreen) {
        GodotDisplayScreen.requestFullscreen()
      }
    }
    function _godot_js_display_size_update() {
      const updated = GodotDisplayScreen.updateSize()
      if (updated) {
        GodotDisplayVK.updateSize()
      }
      return updated
    }
    function _godot_js_display_touchscreen_is_available() {
      return 'ontouchstart' in window
    }
    function _godot_js_display_vk_available() {
      return GodotDisplayVK.available()
    }
    function _godot_js_display_vk_cb(p_input_cb) {
      const input_cb = GodotRuntime.get_func(p_input_cb)
      if (GodotDisplayVK.available()) {
        GodotDisplayVK.init(input_cb)
      }
    }
    function _godot_js_display_vk_hide() {
      GodotDisplayVK.hide()
    }
    function _godot_js_display_vk_show(p_text, p_multiline, p_start, p_end) {
      const text = GodotRuntime.parseString(p_text)
      const start = p_start > 0 ? p_start : 0
      const end = p_end > 0 ? p_end : start
      GodotDisplayVK.show(text, p_multiline, start, end)
    }
    function _godot_js_display_window_blur_cb(callback) {
      const func = GodotRuntime.get_func(callback)
      GodotEventListeners.add(
        window,
        'blur',
        function () {
          func()
        },
        false
      )
    }
    function _godot_js_display_window_icon_set(p_ptr, p_len) {
      let link = document.getElementById('-gd-engine-icon')
      if (link === null) {
        link = document.createElement('link')
        link.rel = 'icon'
        link.id = '-gd-engine-icon'
        document.head.appendChild(link)
      }
      const old_icon = GodotDisplay.window_icon
      const png = new Blob([GodotRuntime.heapSlice(HEAPU8, p_ptr, p_len)], { type: 'image/png' })
      GodotDisplay.window_icon = URL.createObjectURL(png)
      link.href = GodotDisplay.window_icon
      if (old_icon) {
        URL.revokeObjectURL(old_icon)
      }
    }
    function _godot_js_display_window_size_get(p_width, p_height) {
      GodotRuntime.setHeapValue(p_width, GodotConfig.canvas.width, 'i32')
      GodotRuntime.setHeapValue(p_height, GodotConfig.canvas.height, 'i32')
    }
    function _godot_js_display_window_title_set(p_data) {
      document.title = GodotRuntime.parseString(p_data)
    }
    function _godot_js_eval(
      p_js,
      p_use_global_ctx,
      p_union_ptr,
      p_byte_arr,
      p_byte_arr_write,
      p_callback
    ) {
      const js_code = GodotRuntime.parseString(p_js)
      let eval_ret = null
      try {
        if (p_use_global_ctx) {
          const global_eval = eval
          eval_ret = global_eval(js_code)
        } else {
          eval_ret = eval(js_code)
        }
      } catch (e) {
        GodotRuntime.error(e)
      }
      switch (typeof eval_ret) {
        case 'boolean':
          GodotRuntime.setHeapValue(p_union_ptr, eval_ret, 'i32')
          return 1
        case 'number':
          GodotRuntime.setHeapValue(p_union_ptr, eval_ret, 'double')
          return 3
        case 'string':
          GodotRuntime.setHeapValue(p_union_ptr, GodotRuntime.allocString(eval_ret), '*')
          return 4
        case 'object':
          if (eval_ret === null) {
            break
          }
          if (ArrayBuffer.isView(eval_ret) && !(eval_ret instanceof Uint8Array)) {
            eval_ret = new Uint8Array(eval_ret.buffer)
          } else if (eval_ret instanceof ArrayBuffer) {
            eval_ret = new Uint8Array(eval_ret)
          }
          if (eval_ret instanceof Uint8Array) {
            const func = GodotRuntime.get_func(p_callback)
            const bytes_ptr = func(p_byte_arr, p_byte_arr_write, eval_ret.length)
            HEAPU8.set(eval_ret, bytes_ptr)
            return 20
          }
          break
      }
      return 0
    }
    var IDHandler = {
      _last_id: 0,
      _references: {},
      get: function (p_id) {
        return IDHandler._references[p_id]
      },
      add: function (p_data) {
        const id = ++IDHandler._last_id
        IDHandler._references[id] = p_data
        return id
      },
      remove: function (p_id) {
        delete IDHandler._references[p_id]
      }
    }
    var GodotFetch = {
      onread: function (id, result) {
        const obj = IDHandler.get(id)
        if (!obj) {
          return
        }
        if (result.value) {
          obj.chunks.push(result.value)
        }
        obj.reading = false
        obj.done = result.done
      },
      onresponse: function (id, response) {
        const obj = IDHandler.get(id)
        if (!obj) {
          return
        }
        let chunked = false
        response.headers.forEach(function (value, header) {
          const v = value.toLowerCase().trim()
          const h = header.toLowerCase().trim()
          if (h === 'transfer-encoding' && v === 'chunked') {
            chunked = true
          }
        })
        obj.status = response.status
        obj.response = response
        obj.reader = response.body.getReader()
        obj.chunked = chunked
      },
      onerror: function (id, err) {
        GodotRuntime.error(err)
        const obj = IDHandler.get(id)
        if (!obj) {
          return
        }
        obj.error = err
      },
      create: function (method, url, headers, body) {
        const obj = {
          request: null,
          response: null,
          reader: null,
          error: null,
          done: false,
          reading: false,
          status: 0,
          chunks: [],
          bodySize: -1
        }
        const id = IDHandler.add(obj)
        const init = { method: method, headers: headers, body: body }
        obj.request = fetch(url, init)
        obj.request
          .then(GodotFetch.onresponse.bind(null, id))
          .catch(GodotFetch.onerror.bind(null, id))
        return id
      },
      free: function (id) {
        const obj = IDHandler.get(id)
        if (!obj) {
          return
        }
        IDHandler.remove(id)
        if (!obj.request) {
          return
        }
        obj.request
          .then(function (response) {
            response.abort()
          })
          .catch(function (e) {})
      },
      read: function (id) {
        const obj = IDHandler.get(id)
        if (!obj) {
          return
        }
        if (obj.reader && !obj.reading) {
          if (obj.done) {
            obj.reader = null
            return
          }
          obj.reading = true
          obj.reader
            .read()
            .then(GodotFetch.onread.bind(null, id))
            .catch(GodotFetch.onerror.bind(null, id))
        }
      }
    }
    function _godot_js_fetch_body_length_get(p_id) {
      const obj = IDHandler.get(p_id)
      if (!obj || !obj.response) {
        return -1
      }
      return obj.bodySize
    }
    function _godot_js_fetch_create(
      p_method,
      p_url,
      p_headers,
      p_headers_size,
      p_body,
      p_body_size
    ) {
      const method = GodotRuntime.parseString(p_method)
      const url = GodotRuntime.parseString(p_url)
      const headers = GodotRuntime.parseStringArray(p_headers, p_headers_size)
      const body = p_body_size ? GodotRuntime.heapSlice(HEAP8, p_body, p_body_size) : null
      return GodotFetch.create(
        method,
        url,
        headers
          .map(function (hv) {
            const idx = hv.indexOf(':')
            if (idx <= 0) {
              return []
            }
            return [hv.slice(0, idx).trim(), hv.slice(idx + 1).trim()]
          })
          .filter(function (v) {
            return v.length === 2
          }),
        body
      )
    }
    function _godot_js_fetch_free(id) {
      GodotFetch.free(id)
    }
    function _godot_js_fetch_http_status_get(p_id) {
      const obj = IDHandler.get(p_id)
      if (!obj || !obj.response) {
        return 0
      }
      return obj.status
    }
    function _godot_js_fetch_is_chunked(p_id) {
      const obj = IDHandler.get(p_id)
      if (!obj || !obj.response) {
        return -1
      }
      return obj.chunked ? 1 : 0
    }
    function _godot_js_fetch_read_chunk(p_id, p_buf, p_buf_size) {
      const obj = IDHandler.get(p_id)
      if (!obj || !obj.response) {
        return 0
      }
      let to_read = p_buf_size
      const chunks = obj.chunks
      while (to_read && chunks.length) {
        const chunk = obj.chunks[0]
        if (chunk.length > to_read) {
          GodotRuntime.heapCopy(HEAP8, chunk.slice(0, to_read), p_buf)
          chunks[0] = chunk.slice(to_read)
          to_read = 0
        } else {
          GodotRuntime.heapCopy(HEAP8, chunk, p_buf)
          to_read -= chunk.length
          chunks.pop()
        }
      }
      if (!chunks.length) {
        GodotFetch.read(p_id)
      }
      return p_buf_size - to_read
    }
    function _godot_js_fetch_read_headers(p_id, p_parse_cb, p_ref) {
      const obj = IDHandler.get(p_id)
      if (!obj || !obj.response) {
        return 1
      }
      const cb = GodotRuntime.get_func(p_parse_cb)
      const arr = []
      obj.response.headers.forEach(function (v, h) {
        arr.push(`${h}:${v}`)
      })
      const c_ptr = GodotRuntime.allocStringArray(arr)
      cb(arr.length, c_ptr, p_ref)
      GodotRuntime.freeStringArray(c_ptr, arr.length)
      return 0
    }
    function _godot_js_fetch_state_get(p_id) {
      const obj = IDHandler.get(p_id)
      if (!obj) {
        return -1
      }
      if (obj.error) {
        return -1
      }
      if (!obj.response) {
        return 0
      }
      if (obj.reader) {
        return 1
      }
      if (obj.done) {
        return 2
      }
      return -1
    }
    var GodotInputGamepads = {
      samples: [],
      get_pads: function () {
        try {
          const pads = navigator.getGamepads()
          if (pads) {
            return pads
          }
          return []
        } catch (e) {
          return []
        }
      },
      get_samples: function () {
        return GodotInputGamepads.samples
      },
      get_sample: function (index) {
        const samples = GodotInputGamepads.samples
        return index < samples.length ? samples[index] : null
      },
      sample: function () {
        const pads = GodotInputGamepads.get_pads()
        const samples = []
        for (let i = 0; i < pads.length; i++) {
          const pad = pads[i]
          if (!pad) {
            samples.push(null)
            continue
          }
          const s = {
            standard: pad.mapping === 'standard',
            buttons: [],
            axes: [],
            connected: pad.connected
          }
          for (let b = 0; b < pad.buttons.length; b++) {
            s.buttons.push(pad.buttons[b].value)
          }
          for (let a = 0; a < pad.axes.length; a++) {
            s.axes.push(pad.axes[a])
          }
          samples.push(s)
        }
        GodotInputGamepads.samples = samples
      },
      init: function (onchange) {
        GodotInputGamepads.samples = []
        function add(pad) {
          const guid = GodotInputGamepads.get_guid(pad)
          const c_id = GodotRuntime.allocString(pad.id)
          const c_guid = GodotRuntime.allocString(guid)
          onchange(pad.index, 1, c_id, c_guid)
          GodotRuntime.free(c_id)
          GodotRuntime.free(c_guid)
        }
        const pads = GodotInputGamepads.get_pads()
        for (let i = 0; i < pads.length; i++) {
          if (pads[i]) {
            add(pads[i])
          }
        }
        GodotEventListeners.add(
          window,
          'gamepadconnected',
          function (evt) {
            if (evt.gamepad) {
              add(evt.gamepad)
            }
          },
          false
        )
        GodotEventListeners.add(
          window,
          'gamepaddisconnected',
          function (evt) {
            if (evt.gamepad) {
              onchange(evt.gamepad.index, 0)
            }
          },
          false
        )
      },
      get_guid: function (pad) {
        if (pad.mapping) {
          return pad.mapping
        }
        const ua = navigator.userAgent
        let os = 'Unknown'
        if (ua.indexOf('Android') >= 0) {
          os = 'Android'
        } else if (ua.indexOf('Linux') >= 0) {
          os = 'Linux'
        } else if (ua.indexOf('iPhone') >= 0) {
          os = 'iOS'
        } else if (ua.indexOf('Macintosh') >= 0) {
          os = 'MacOSX'
        } else if (ua.indexOf('Windows') >= 0) {
          os = 'Windows'
        }
        const id = pad.id
        const exp1 = /vendor: ([0-9a-f]{4}) product: ([0-9a-f]{4})/i
        const exp2 = /^([0-9a-f]+)-([0-9a-f]+)-/i
        let vendor = ''
        let product = ''
        if (exp1.test(id)) {
          const match = exp1.exec(id)
          vendor = match[1].padStart(4, '0')
          product = match[2].padStart(4, '0')
        } else if (exp2.test(id)) {
          const match = exp2.exec(id)
          vendor = match[1].padStart(4, '0')
          product = match[2].padStart(4, '0')
        }
        if (!vendor || !product) {
          return `${os}Unknown`
        }
        return os + vendor + product
      }
    }
    var GodotInputDragDrop = {
      promises: [],
      pending_files: [],
      add_entry: function (entry) {
        if (entry.isDirectory) {
          GodotInputDragDrop.add_dir(entry)
        } else if (entry.isFile) {
          GodotInputDragDrop.add_file(entry)
        } else {
          GodotRuntime.error('Unrecognized entry...', entry)
        }
      },
      add_dir: function (entry) {
        GodotInputDragDrop.promises.push(
          new Promise(function (resolve, reject) {
            const reader = entry.createReader()
            reader.readEntries(function (entries) {
              for (let i = 0; i < entries.length; i++) {
                GodotInputDragDrop.add_entry(entries[i])
              }
              resolve()
            })
          })
        )
      },
      add_file: function (entry) {
        GodotInputDragDrop.promises.push(
          new Promise(function (resolve, reject) {
            entry.file(
              function (file) {
                const reader = new FileReader()
                reader.onload = function () {
                  const f = {
                    path: file.relativePath || file.webkitRelativePath,
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: reader.result
                  }
                  if (!f['path']) {
                    f['path'] = f['name']
                  }
                  GodotInputDragDrop.pending_files.push(f)
                  resolve()
                }
                reader.onerror = function () {
                  GodotRuntime.print('Error reading file')
                  reject()
                }
                reader.readAsArrayBuffer(file)
              },
              function (err) {
                GodotRuntime.print('Error!')
                reject()
              }
            )
          })
        )
      },
      process: function (resolve, reject) {
        if (GodotInputDragDrop.promises.length === 0) {
          resolve()
          return
        }
        GodotInputDragDrop.promises.pop().then(function () {
          setTimeout(function () {
            GodotInputDragDrop.process(resolve, reject)
          }, 0)
        })
      },
      _process_event: function (ev, callback) {
        ev.preventDefault()
        if (ev.dataTransfer.items) {
          for (let i = 0; i < ev.dataTransfer.items.length; i++) {
            const item = ev.dataTransfer.items[i]
            let entry = null
            if ('getAsEntry' in item) {
              entry = item.getAsEntry()
            } else if ('webkitGetAsEntry' in item) {
              entry = item.webkitGetAsEntry()
            }
            if (entry) {
              GodotInputDragDrop.add_entry(entry)
            }
          }
        } else {
          GodotRuntime.error('File upload not supported')
        }
        new Promise(GodotInputDragDrop.process).then(function () {
          const DROP = `/tmp/drop-${parseInt(Math.random() * (1 << 30), 10)}/`
          const drops = []
          const files = []
          FS.mkdir(DROP.slice(0, -1))
          GodotInputDragDrop.pending_files.forEach((elem) => {
            const path = elem['path']
            GodotFS.copy_to_fs(DROP + path, elem['data'])
            let idx = path.indexOf('/')
            if (idx === -1) {
              drops.push(DROP + path)
            } else {
              const sub = path.substr(0, idx)
              idx = sub.indexOf('/')
              if (idx < 0 && drops.indexOf(DROP + sub) === -1) {
                drops.push(DROP + sub)
              }
            }
            files.push(DROP + path)
          })
          GodotInputDragDrop.promises = []
          GodotInputDragDrop.pending_files = []
          callback(drops)
          if (GodotConfig.persistent_drops) {
            GodotOS.atexit(function (resolve, reject) {
              GodotInputDragDrop.remove_drop(files, DROP)
              resolve()
            })
          } else {
            GodotInputDragDrop.remove_drop(files, DROP)
          }
        })
      },
      remove_drop: function (files, drop_path) {
        const dirs = [drop_path.substr(0, drop_path.length - 1)]
        files.forEach(function (file) {
          FS.unlink(file)
          let dir = file.replace(drop_path, '')
          let idx = dir.lastIndexOf('/')
          while (idx > 0) {
            dir = dir.substr(0, idx)
            if (dirs.indexOf(drop_path + dir) === -1) {
              dirs.push(drop_path + dir)
            }
            idx = dir.lastIndexOf('/')
          }
        })
        dirs
          .sort(function (a, b) {
            const al = (a.match(/\//g) || []).length
            const bl = (b.match(/\//g) || []).length
            if (al > bl) {
              return -1
            } else if (al < bl) {
              return 1
            }
            return 0
          })
          .forEach(function (dir) {
            FS.rmdir(dir)
          })
      },
      handler: function (callback) {
        return function (ev) {
          GodotInputDragDrop._process_event(ev, callback)
        }
      }
    }
    var GodotInput = {
      getModifiers: function (evt) {
        return (
          evt.shiftKey +
          0 +
          ((evt.altKey + 0) << 1) +
          ((evt.ctrlKey + 0) << 2) +
          ((evt.metaKey + 0) << 3)
        )
      },
      computePosition: function (evt, rect) {
        const canvas = GodotConfig.canvas
        const rw = canvas.width / rect.width
        const rh = canvas.height / rect.height
        const x = (evt.clientX - rect.x) * rw
        const y = (evt.clientY - rect.y) * rh
        return [x, y]
      }
    }
    function _godot_js_input_drop_files_cb(callback) {
      const func = GodotRuntime.get_func(callback)
      const dropFiles = function (files) {
        const args = files || []
        if (!args.length) {
          return
        }
        const argc = args.length
        const argv = GodotRuntime.allocStringArray(args)
        func(argv, argc)
        GodotRuntime.freeStringArray(argv, argc)
      }
      const canvas = GodotConfig.canvas
      GodotEventListeners.add(
        canvas,
        'dragover',
        function (ev) {
          ev.preventDefault()
        },
        false
      )
      GodotEventListeners.add(canvas, 'drop', GodotInputDragDrop.handler(dropFiles))
    }
    function _godot_js_input_gamepad_cb(change_cb) {
      const onchange = GodotRuntime.get_func(change_cb)
      GodotInputGamepads.init(onchange)
    }
    function _godot_js_input_gamepad_sample() {
      GodotInputGamepads.sample()
      return 0
    }
    function _godot_js_input_gamepad_sample_count() {
      return GodotInputGamepads.get_samples().length
    }
    function _godot_js_input_gamepad_sample_get(
      p_index,
      r_btns,
      r_btns_num,
      r_axes,
      r_axes_num,
      r_standard
    ) {
      const sample = GodotInputGamepads.get_sample(p_index)
      if (!sample || !sample.connected) {
        return 1
      }
      const btns = sample.buttons
      const btns_len = btns.length < 16 ? btns.length : 16
      for (let i = 0; i < btns_len; i++) {
        GodotRuntime.setHeapValue(r_btns + (i << 2), btns[i], 'float')
      }
      GodotRuntime.setHeapValue(r_btns_num, btns_len, 'i32')
      const axes = sample.axes
      const axes_len = axes.length < 10 ? axes.length : 10
      for (let i = 0; i < axes_len; i++) {
        GodotRuntime.setHeapValue(r_axes + (i << 2), axes[i], 'float')
      }
      GodotRuntime.setHeapValue(r_axes_num, axes_len, 'i32')
      const is_standard = sample.standard ? 1 : 0
      GodotRuntime.setHeapValue(r_standard, is_standard, 'i32')
      return 0
    }
    function _godot_js_input_key_cb(callback, code, key) {
      const func = GodotRuntime.get_func(callback)
      function key_cb(pressed, evt) {
        const modifiers = GodotInput.getModifiers(evt)
        GodotRuntime.stringToHeap(evt.code, code, 32)
        GodotRuntime.stringToHeap(evt.key, key, 32)
        func(pressed, evt.repeat, modifiers)
        evt.preventDefault()
      }
      GodotEventListeners.add(GodotConfig.canvas, 'keydown', key_cb.bind(null, 1), false)
      GodotEventListeners.add(GodotConfig.canvas, 'keyup', key_cb.bind(null, 0), false)
    }
    function _godot_js_input_mouse_button_cb(callback) {
      const func = GodotRuntime.get_func(callback)
      const canvas = GodotConfig.canvas
      function button_cb(p_pressed, evt) {
        const rect = canvas.getBoundingClientRect()
        const pos = GodotInput.computePosition(evt, rect)
        const modifiers = GodotInput.getModifiers(evt)
        if (p_pressed) {
          GodotConfig.canvas.focus()
        }
        if (func(p_pressed, evt.button, pos[0], pos[1], modifiers)) {
          evt.preventDefault()
        }
      }
      GodotEventListeners.add(canvas, 'mousedown', button_cb.bind(null, 1), false)
      GodotEventListeners.add(window, 'mouseup', button_cb.bind(null, 0), false)
    }
    function _godot_js_input_mouse_move_cb(callback) {
      const func = GodotRuntime.get_func(callback)
      const canvas = GodotConfig.canvas
      function move_cb(evt) {
        const rect = canvas.getBoundingClientRect()
        const pos = GodotInput.computePosition(evt, rect)
        const rw = canvas.width / rect.width
        const rh = canvas.height / rect.height
        const rel_pos_x = evt.movementX * rw
        const rel_pos_y = evt.movementY * rh
        const modifiers = GodotInput.getModifiers(evt)
        func(pos[0], pos[1], rel_pos_x, rel_pos_y, modifiers)
      }
      GodotEventListeners.add(window, 'mousemove', move_cb, false)
    }
    function _godot_js_input_mouse_wheel_cb(callback) {
      const func = GodotRuntime.get_func(callback)
      function wheel_cb(evt) {
        if (func(evt['deltaX'] || 0, evt['deltaY'] || 0)) {
          evt.preventDefault()
        }
      }
      GodotEventListeners.add(GodotConfig.canvas, 'wheel', wheel_cb, false)
    }
    function _godot_js_input_paste_cb(callback) {
      const func = GodotRuntime.get_func(callback)
      GodotEventListeners.add(
        window,
        'paste',
        function (evt) {
          const text = evt.clipboardData.getData('text')
          const ptr = GodotRuntime.allocString(text)
          func(ptr)
          GodotRuntime.free(ptr)
        },
        false
      )
    }
    function _godot_js_input_touch_cb(callback, ids, coords) {
      const func = GodotRuntime.get_func(callback)
      const canvas = GodotConfig.canvas
      function touch_cb(type, evt) {
        if (type === 0) {
          GodotConfig.canvas.focus()
        }
        const rect = canvas.getBoundingClientRect()
        const touches = evt.changedTouches
        for (let i = 0; i < touches.length; i++) {
          const touch = touches[i]
          const pos = GodotInput.computePosition(touch, rect)
          GodotRuntime.setHeapValue(coords + i * 2 * 8, pos[0], 'double')
          GodotRuntime.setHeapValue(coords + (i * 2 + 1) * 8, pos[1], 'double')
          GodotRuntime.setHeapValue(ids + i * 4, touch.identifier, 'i32')
        }
        func(type, touches.length)
        if (evt.cancelable) {
          evt.preventDefault()
        }
      }
      GodotEventListeners.add(canvas, 'touchstart', touch_cb.bind(null, 0), false)
      GodotEventListeners.add(canvas, 'touchend', touch_cb.bind(null, 1), false)
      GodotEventListeners.add(canvas, 'touchcancel', touch_cb.bind(null, 1), false)
      GodotEventListeners.add(canvas, 'touchmove', touch_cb.bind(null, 2), false)
    }
    function _godot_js_input_vibrate_handheld(p_duration_ms) {
      if (typeof navigator.vibrate !== 'function') {
        GodotRuntime.print('This browser does not support vibration.')
      } else {
        navigator.vibrate(p_duration_ms)
      }
    }
    function _godot_js_os_download_buffer(p_ptr, p_size, p_name, p_mime) {
      const buf = GodotRuntime.heapSlice(HEAP8, p_ptr, p_size)
      const name = GodotRuntime.parseString(p_name)
      const mime = GodotRuntime.parseString(p_mime)
      const blob = new Blob([buf], { type: mime })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = name
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    }
    function _godot_js_os_execute(p_json) {
      const json_args = GodotRuntime.parseString(p_json)
      const args = JSON.parse(json_args)
      if (GodotConfig.on_execute) {
        GodotConfig.on_execute(args)
        return 0
      }
      return 1
    }
    function _godot_js_os_finish_async(p_callback) {
      const func = GodotRuntime.get_func(p_callback)
      GodotOS.finish_async(func)
    }
    function _godot_js_os_fs_is_persistent() {
      return GodotFS.is_persistent()
    }
    function _godot_js_os_fs_sync(callback) {
      const func = GodotRuntime.get_func(callback)
      GodotOS._fs_sync_promise = GodotFS.sync()
      GodotOS._fs_sync_promise.then(function (err) {
        func()
      })
    }
    function _godot_js_os_hw_concurrency_get() {
      return navigator.hardwareConcurrency || 1
    }
    function _godot_js_os_request_quit_cb(p_callback) {
      GodotOS.request_quit = GodotRuntime.get_func(p_callback)
    }
    function _godot_js_os_shell_open(p_uri) {
      window.open(GodotRuntime.parseString(p_uri), '_blank')
    }
    var GodotPWA = {
      hasUpdate: false,
      updateState: function (cb, reg) {
        if (!reg) {
          return
        }
        if (!reg.active) {
          return
        }
        if (reg.waiting) {
          GodotPWA.hasUpdate = true
          cb()
        }
        GodotEventListeners.add(reg, 'updatefound', function () {
          const installing = reg.installing
          GodotEventListeners.add(installing, 'statechange', function () {
            if (installing.state === 'installed') {
              GodotPWA.hasUpdate = true
              cb()
            }
          })
        })
      }
    }
    function _godot_js_pwa_cb(p_update_cb) {
      if ('serviceWorker' in navigator) {
        const cb = GodotRuntime.get_func(p_update_cb)
        navigator.serviceWorker.getRegistration().then(GodotPWA.updateState.bind(null, cb))
      }
    }
    function _godot_js_pwa_update() {
      if ('serviceWorker' in navigator && GodotPWA.hasUpdate) {
        navigator.serviceWorker.getRegistration().then(function (reg) {
          if (!reg || !reg.waiting) {
            return
          }
          reg.waiting.postMessage('update')
        })
        return 0
      }
      return 1
    }
    var GodotRTCDataChannel = {
      connect: function (p_id, p_on_open, p_on_message, p_on_error, p_on_close) {
        const ref = IDHandler.get(p_id)
        if (!ref) {
          return
        }
        ref.binaryType = 'arraybuffer'
        ref.onopen = function (event) {
          p_on_open()
        }
        ref.onclose = function (event) {
          p_on_close()
        }
        ref.onerror = function (event) {
          p_on_error()
        }
        ref.onmessage = function (event) {
          let buffer
          let is_string = 0
          if (event.data instanceof ArrayBuffer) {
            buffer = new Uint8Array(event.data)
          } else if (event.data instanceof Blob) {
            GodotRuntime.error('Blob type not supported')
            return
          } else if (typeof event.data === 'string') {
            is_string = 1
            const enc = new TextEncoder('utf-8')
            buffer = new Uint8Array(enc.encode(event.data))
          } else {
            GodotRuntime.error('Unknown message type')
            return
          }
          const len = buffer.length * buffer.BYTES_PER_ELEMENT
          const out = GodotRuntime.malloc(len)
          HEAPU8.set(buffer, out)
          p_on_message(out, len, is_string)
          GodotRuntime.free(out)
        }
      },
      close: function (p_id) {
        const ref = IDHandler.get(p_id)
        if (!ref) {
          return
        }
        ref.onopen = null
        ref.onmessage = null
        ref.onerror = null
        ref.onclose = null
        ref.close()
      },
      get_prop: function (p_id, p_prop, p_def) {
        const ref = IDHandler.get(p_id)
        return ref && ref[p_prop] !== undefined ? ref[p_prop] : p_def
      }
    }
    function _godot_js_rtc_datachannel_close(p_id) {
      const ref = IDHandler.get(p_id)
      if (!ref) {
        return
      }
      GodotRTCDataChannel.close(p_id)
    }
    function _godot_js_rtc_datachannel_connect(
      p_id,
      p_ref,
      p_on_open,
      p_on_message,
      p_on_error,
      p_on_close
    ) {
      const onopen = GodotRuntime.get_func(p_on_open).bind(null, p_ref)
      const onmessage = GodotRuntime.get_func(p_on_message).bind(null, p_ref)
      const onerror = GodotRuntime.get_func(p_on_error).bind(null, p_ref)
      const onclose = GodotRuntime.get_func(p_on_close).bind(null, p_ref)
      GodotRTCDataChannel.connect(p_id, onopen, onmessage, onerror, onclose)
    }
    function _godot_js_rtc_datachannel_destroy(p_id) {
      GodotRTCDataChannel.close(p_id)
      IDHandler.remove(p_id)
    }
    function _godot_js_rtc_datachannel_get_buffered_amount(p_id) {
      return GodotRTCDataChannel.get_prop(p_id, 'bufferedAmount', 0)
    }
    function _godot_js_rtc_datachannel_id_get(p_id) {
      return GodotRTCDataChannel.get_prop(p_id, 'id', 65535)
    }
    function _godot_js_rtc_datachannel_is_negotiated(p_id) {
      return GodotRTCDataChannel.get_prop(p_id, 'negotiated', 65535)
    }
    function _godot_js_rtc_datachannel_is_ordered(p_id) {
      return GodotRTCDataChannel.get_prop(p_id, 'ordered', true)
    }
    function _godot_js_rtc_datachannel_label_get(p_id) {
      const ref = IDHandler.get(p_id)
      if (!ref || !ref.label) {
        return 0
      }
      return GodotRuntime.allocString(ref.label)
    }
    function _godot_js_rtc_datachannel_max_packet_lifetime_get(p_id) {
      const ref = IDHandler.get(p_id)
      if (!ref) {
        return 65535
      }
      if (ref['maxPacketLifeTime'] !== undefined) {
        return ref['maxPacketLifeTime']
      } else if (ref['maxRetransmitTime'] !== undefined) {
        return ref['maxRetransmitTime']
      }
      return 65535
    }
    function _godot_js_rtc_datachannel_max_retransmits_get(p_id) {
      return GodotRTCDataChannel.get_prop(p_id, 'maxRetransmits', 65535)
    }
    function _godot_js_rtc_datachannel_protocol_get(p_id) {
      const ref = IDHandler.get(p_id)
      if (!ref || !ref.protocol) {
        return 0
      }
      return GodotRuntime.allocString(ref.protocol)
    }
    function _godot_js_rtc_datachannel_ready_state_get(p_id) {
      const ref = IDHandler.get(p_id)
      if (!ref) {
        return 3
      }
      switch (ref.readyState) {
        case 'connecting':
          return 0
        case 'open':
          return 1
        case 'closing':
          return 2
        case 'closed':
        default:
          return 3
      }
    }
    function _godot_js_rtc_datachannel_send(p_id, p_buffer, p_length, p_raw) {
      const ref = IDHandler.get(p_id)
      if (!ref) {
        return 1
      }
      const bytes_array = new Uint8Array(p_length)
      for (let i = 0; i < p_length; i++) {
        bytes_array[i] = GodotRuntime.getHeapValue(p_buffer + i, 'i8')
      }
      if (p_raw) {
        ref.send(bytes_array.buffer)
      } else {
        const string = new TextDecoder('utf-8').decode(bytes_array)
        ref.send(string)
      }
      return 0
    }
    var GodotRTCPeerConnection = {
      onstatechange: function (p_id, p_conn, callback, event) {
        const ref = IDHandler.get(p_id)
        if (!ref) {
          return
        }
        let state
        switch (p_conn.iceConnectionState) {
          case 'new':
            state = 0
            break
          case 'checking':
            state = 1
            break
          case 'connected':
          case 'completed':
            state = 2
            break
          case 'disconnected':
            state = 3
            break
          case 'failed':
            state = 4
            break
          case 'closed':
          default:
            state = 5
            break
        }
        callback(state)
      },
      onicecandidate: function (p_id, callback, event) {
        const ref = IDHandler.get(p_id)
        if (!ref || !event.candidate) {
          return
        }
        const c = event.candidate
        const candidate_str = GodotRuntime.allocString(c.candidate)
        const mid_str = GodotRuntime.allocString(c.sdpMid)
        callback(mid_str, c.sdpMLineIndex, candidate_str)
        GodotRuntime.free(candidate_str)
        GodotRuntime.free(mid_str)
      },
      ondatachannel: function (p_id, callback, event) {
        const ref = IDHandler.get(p_id)
        if (!ref) {
          return
        }
        const cid = IDHandler.add(event.channel)
        callback(cid)
      },
      onsession: function (p_id, callback, session) {
        const ref = IDHandler.get(p_id)
        if (!ref) {
          return
        }
        const type_str = GodotRuntime.allocString(session.type)
        const sdp_str = GodotRuntime.allocString(session.sdp)
        callback(type_str, sdp_str)
        GodotRuntime.free(type_str)
        GodotRuntime.free(sdp_str)
      },
      onerror: function (p_id, callback, error) {
        const ref = IDHandler.get(p_id)
        if (!ref) {
          return
        }
        GodotRuntime.error(error)
        callback()
      }
    }
    function _godot_js_rtc_pc_close(p_id) {
      const ref = IDHandler.get(p_id)
      if (!ref) {
        return
      }
      ref.close()
    }
    function _godot_js_rtc_pc_create(
      p_config,
      p_ref,
      p_on_state_change,
      p_on_candidate,
      p_on_datachannel
    ) {
      const onstatechange = GodotRuntime.get_func(p_on_state_change).bind(null, p_ref)
      const oncandidate = GodotRuntime.get_func(p_on_candidate).bind(null, p_ref)
      const ondatachannel = GodotRuntime.get_func(p_on_datachannel).bind(null, p_ref)
      const config = JSON.parse(GodotRuntime.parseString(p_config))
      let conn = null
      try {
        conn = new RTCPeerConnection(config)
      } catch (e) {
        GodotRuntime.error(e)
        return 0
      }
      const base = GodotRTCPeerConnection
      const id = IDHandler.add(conn)
      conn.oniceconnectionstatechange = base.onstatechange.bind(null, id, conn, onstatechange)
      conn.onicecandidate = base.onicecandidate.bind(null, id, oncandidate)
      conn.ondatachannel = base.ondatachannel.bind(null, id, ondatachannel)
      return id
    }
    function _godot_js_rtc_pc_datachannel_create(p_id, p_label, p_config) {
      try {
        const ref = IDHandler.get(p_id)
        if (!ref) {
          return 0
        }
        const label = GodotRuntime.parseString(p_label)
        const config = JSON.parse(GodotRuntime.parseString(p_config))
        const channel = ref.createDataChannel(label, config)
        return IDHandler.add(channel)
      } catch (e) {
        GodotRuntime.error(e)
        return 0
      }
    }
    function _godot_js_rtc_pc_destroy(p_id) {
      const ref = IDHandler.get(p_id)
      if (!ref) {
        return
      }
      ref.oniceconnectionstatechange = null
      ref.onicecandidate = null
      ref.ondatachannel = null
      IDHandler.remove(p_id)
    }
    function _godot_js_rtc_pc_ice_candidate_add(p_id, p_mid_name, p_mline_idx, p_sdp) {
      const ref = IDHandler.get(p_id)
      if (!ref) {
        return
      }
      const sdpMidName = GodotRuntime.parseString(p_mid_name)
      const sdpName = GodotRuntime.parseString(p_sdp)
      ref.addIceCandidate(
        new RTCIceCandidate({ candidate: sdpName, sdpMid: sdpMidName, sdpMlineIndex: p_mline_idx })
      )
    }
    function _godot_js_rtc_pc_local_description_set(p_id, p_type, p_sdp, p_obj, p_on_error) {
      const ref = IDHandler.get(p_id)
      if (!ref) {
        return
      }
      const type = GodotRuntime.parseString(p_type)
      const sdp = GodotRuntime.parseString(p_sdp)
      const onerror = GodotRuntime.get_func(p_on_error).bind(null, p_obj)
      ref.setLocalDescription({ sdp: sdp, type: type }).catch(function (error) {
        GodotRTCPeerConnection.onerror(p_id, onerror, error)
      })
    }
    function _godot_js_rtc_pc_offer_create(p_id, p_obj, p_on_session, p_on_error) {
      const ref = IDHandler.get(p_id)
      if (!ref) {
        return
      }
      const onsession = GodotRuntime.get_func(p_on_session).bind(null, p_obj)
      const onerror = GodotRuntime.get_func(p_on_error).bind(null, p_obj)
      ref
        .createOffer()
        .then(function (session) {
          GodotRTCPeerConnection.onsession(p_id, onsession, session)
        })
        .catch(function (error) {
          GodotRTCPeerConnection.onerror(p_id, onerror, error)
        })
    }
    function _godot_js_rtc_pc_remote_description_set(
      p_id,
      p_type,
      p_sdp,
      p_obj,
      p_session_created,
      p_on_error
    ) {
      const ref = IDHandler.get(p_id)
      if (!ref) {
        return
      }
      const type = GodotRuntime.parseString(p_type)
      const sdp = GodotRuntime.parseString(p_sdp)
      const onerror = GodotRuntime.get_func(p_on_error).bind(null, p_obj)
      const onsession = GodotRuntime.get_func(p_session_created).bind(null, p_obj)
      ref
        .setRemoteDescription({ sdp: sdp, type: type })
        .then(function () {
          if (type !== 'offer') {
            return Promise.resolve()
          }
          return ref.createAnswer().then(function (session) {
            GodotRTCPeerConnection.onsession(p_id, onsession, session)
          })
        })
        .catch(function (error) {
          GodotRTCPeerConnection.onerror(p_id, onerror, error)
        })
    }
    var GodotWebSocket = {
      _onopen: function (p_id, callback, event) {
        const ref = IDHandler.get(p_id)
        if (!ref) {
          return
        }
        const c_str = GodotRuntime.allocString(ref.protocol)
        callback(c_str)
        GodotRuntime.free(c_str)
      },
      _onmessage: function (p_id, callback, event) {
        const ref = IDHandler.get(p_id)
        if (!ref) {
          return
        }
        let buffer
        let is_string = 0
        if (event.data instanceof ArrayBuffer) {
          buffer = new Uint8Array(event.data)
        } else if (event.data instanceof Blob) {
          GodotRuntime.error('Blob type not supported')
          return
        } else if (typeof event.data === 'string') {
          is_string = 1
          const enc = new TextEncoder('utf-8')
          buffer = new Uint8Array(enc.encode(event.data))
        } else {
          GodotRuntime.error('Unknown message type')
          return
        }
        const len = buffer.length * buffer.BYTES_PER_ELEMENT
        const out = GodotRuntime.malloc(len)
        HEAPU8.set(buffer, out)
        callback(out, len, is_string)
        GodotRuntime.free(out)
      },
      _onerror: function (p_id, callback, event) {
        const ref = IDHandler.get(p_id)
        if (!ref) {
          return
        }
        callback()
      },
      _onclose: function (p_id, callback, event) {
        const ref = IDHandler.get(p_id)
        if (!ref) {
          return
        }
        const c_str = GodotRuntime.allocString(event.reason)
        callback(event.code, c_str, event.wasClean ? 1 : 0)
        GodotRuntime.free(c_str)
      },
      send: function (p_id, p_data) {
        const ref = IDHandler.get(p_id)
        if (!ref || ref.readyState !== ref.OPEN) {
          return 1
        }
        ref.send(p_data)
        return 0
      },
      bufferedAmount: function (p_id) {
        const ref = IDHandler.get(p_id)
        if (!ref) {
          return 0
        }
        return ref.bufferedAmount
      },
      create: function (socket, p_on_open, p_on_message, p_on_error, p_on_close) {
        const id = IDHandler.add(socket)
        socket.onopen = GodotWebSocket._onopen.bind(null, id, p_on_open)
        socket.onmessage = GodotWebSocket._onmessage.bind(null, id, p_on_message)
        socket.onerror = GodotWebSocket._onerror.bind(null, id, p_on_error)
        socket.onclose = GodotWebSocket._onclose.bind(null, id, p_on_close)
        return id
      },
      close: function (p_id, p_code, p_reason) {
        const ref = IDHandler.get(p_id)
        if (ref && ref.readyState < ref.CLOSING) {
          const code = p_code
          const reason = GodotRuntime.parseString(p_reason)
          ref.close(code, reason)
        }
      },
      destroy: function (p_id) {
        const ref = IDHandler.get(p_id)
        if (!ref) {
          return
        }
        GodotWebSocket.close(p_id, 3001, 'destroyed')
        IDHandler.remove(p_id)
        ref.onopen = null
        ref.onmessage = null
        ref.onerror = null
        ref.onclose = null
      }
    }
    function _godot_js_websocket_buffered_amount(p_id) {
      return GodotWebSocket.bufferedAmount(p_id)
    }
    function _godot_js_websocket_close(p_id, p_code, p_reason) {
      const code = p_code
      const reason = GodotRuntime.parseString(p_reason)
      GodotWebSocket.close(p_id, code, reason)
    }
    function _godot_js_websocket_create(
      p_ref,
      p_url,
      p_proto,
      p_on_open,
      p_on_message,
      p_on_error,
      p_on_close
    ) {
      const on_open = GodotRuntime.get_func(p_on_open).bind(null, p_ref)
      const on_message = GodotRuntime.get_func(p_on_message).bind(null, p_ref)
      const on_error = GodotRuntime.get_func(p_on_error).bind(null, p_ref)
      const on_close = GodotRuntime.get_func(p_on_close).bind(null, p_ref)
      const url = GodotRuntime.parseString(p_url)
      const protos = GodotRuntime.parseString(p_proto)
      let socket = null
      try {
        if (protos) {
          socket = new WebSocket(url, protos.split(','))
        } else {
          socket = new WebSocket(url)
        }
      } catch (e) {
        return 0
      }
      socket.binaryType = 'arraybuffer'
      return GodotWebSocket.create(socket, on_open, on_message, on_error, on_close)
    }
    function _godot_js_websocket_destroy(p_id) {
      GodotWebSocket.destroy(p_id)
    }
    function _godot_js_websocket_send(p_id, p_buf, p_buf_len, p_raw) {
      const bytes_array = new Uint8Array(p_buf_len)
      let i = 0
      for (i = 0; i < p_buf_len; i++) {
        bytes_array[i] = GodotRuntime.getHeapValue(p_buf + i, 'i8')
      }
      let out = bytes_array.buffer
      if (!p_raw) {
        out = new TextDecoder('utf-8').decode(bytes_array)
      }
      return GodotWebSocket.send(p_id, out)
    }
    var GodotJSWrapper = {
      proxies: null,
      MyProxy: function (val) {
        const id = IDHandler.add(this)
        GodotJSWrapper.proxies.set(val, id)
        let refs = 1
        this.ref = function () {
          refs++
        }
        this.unref = function () {
          refs--
          if (refs === 0) {
            IDHandler.remove(id)
            GodotJSWrapper.proxies.delete(val)
          }
        }
        this.get_val = function () {
          return val
        }
        this.get_id = function () {
          return id
        }
      },
      get_proxied: function (val) {
        const id = GodotJSWrapper.proxies.get(val)
        if (id === undefined) {
          const proxy = new GodotJSWrapper.MyProxy(val)
          return proxy.get_id()
        }
        IDHandler.get(id).ref()
        return id
      },
      get_proxied_value: function (id) {
        const proxy = IDHandler.get(id)
        if (proxy === undefined) {
          return undefined
        }
        return proxy.get_val()
      },
      variant2js: function (type, val) {
        switch (type) {
          case 0:
            return null
          case 1:
            return !!GodotRuntime.getHeapValue(val, 'i64')
          case 2:
            return GodotRuntime.getHeapValue(val, 'i64')
          case 3:
            return GodotRuntime.getHeapValue(val, 'double')
          case 4:
            return GodotRuntime.parseString(GodotRuntime.getHeapValue(val, '*'))
          case 17:
            return GodotJSWrapper.get_proxied_value(GodotRuntime.getHeapValue(val, 'i64'))
          default:
            return undefined
        }
      },
      js2variant: function (p_val, p_exchange) {
        if (p_val === undefined || p_val === null) {
          return 0
        }
        const type = typeof p_val
        if (type === 'boolean') {
          GodotRuntime.setHeapValue(p_exchange, p_val, 'i64')
          return 1
        } else if (type === 'number') {
          if (Number.isInteger(p_val)) {
            GodotRuntime.setHeapValue(p_exchange, p_val, 'i64')
            return 2
          }
          GodotRuntime.setHeapValue(p_exchange, p_val, 'double')
          return 3
        } else if (type === 'string') {
          const c_str = GodotRuntime.allocString(p_val)
          GodotRuntime.setHeapValue(p_exchange, c_str, '*')
          return 4
        }
        const id = GodotJSWrapper.get_proxied(p_val)
        GodotRuntime.setHeapValue(p_exchange, id, 'i64')
        return 17
      }
    }
    function _godot_js_wrapper_create_cb(p_ref, p_func) {
      const func = GodotRuntime.get_func(p_func)
      let id = 0
      const cb = function () {
        if (!GodotJSWrapper.get_proxied_value(id)) {
          return
        }
        const args = Array.from(arguments)
        func(p_ref, GodotJSWrapper.get_proxied(args), args.length)
      }
      id = GodotJSWrapper.get_proxied(cb)
      return id
    }
    function _godot_js_wrapper_create_object(
      p_object,
      p_args,
      p_argc,
      p_convert_callback,
      p_exchange,
      p_lock,
      p_free_lock_callback
    ) {
      const name = GodotRuntime.parseString(p_object)
      if (typeof window[name] === 'undefined') {
        return -1
      }
      const convert = GodotRuntime.get_func(p_convert_callback)
      const freeLock = GodotRuntime.get_func(p_free_lock_callback)
      const args = new Array(p_argc)
      for (let i = 0; i < p_argc; i++) {
        const type = convert(p_args, i, p_exchange, p_lock)
        const lock = GodotRuntime.getHeapValue(p_lock, '*')
        args[i] = GodotJSWrapper.variant2js(type, p_exchange)
        if (lock) {
          freeLock(p_lock, type)
        }
      }
      try {
        const res = new window[name](...args)
        return GodotJSWrapper.js2variant(res, p_exchange)
      } catch (e) {
        GodotRuntime.error(`Error calling constructor ${name} with args:`, args, 'error:', e)
        return -1
      }
    }
    function _godot_js_wrapper_interface_get(p_name) {
      const name = GodotRuntime.parseString(p_name)
      if (typeof window[name] !== 'undefined') {
        return GodotJSWrapper.get_proxied(window[name])
      }
      return 0
    }
    function _godot_js_wrapper_object_call(
      p_id,
      p_method,
      p_args,
      p_argc,
      p_convert_callback,
      p_exchange,
      p_lock,
      p_free_lock_callback
    ) {
      const obj = GodotJSWrapper.get_proxied_value(p_id)
      if (obj === undefined) {
        return -1
      }
      const method = GodotRuntime.parseString(p_method)
      const convert = GodotRuntime.get_func(p_convert_callback)
      const freeLock = GodotRuntime.get_func(p_free_lock_callback)
      const args = new Array(p_argc)
      for (let i = 0; i < p_argc; i++) {
        const type = convert(p_args, i, p_exchange, p_lock)
        const lock = GodotRuntime.getHeapValue(p_lock, '*')
        args[i] = GodotJSWrapper.variant2js(type, p_exchange)
        if (lock) {
          freeLock(p_lock, type)
        }
      }
      try {
        const res = obj[method](...args)
        return GodotJSWrapper.js2variant(res, p_exchange)
      } catch (e) {
        GodotRuntime.error(`Error calling method ${method} on:`, obj, 'error:', e)
        return -1
      }
    }
    function _godot_js_wrapper_object_get(p_id, p_exchange, p_prop) {
      const obj = GodotJSWrapper.get_proxied_value(p_id)
      if (obj === undefined) {
        return 0
      }
      if (p_prop) {
        const prop = GodotRuntime.parseString(p_prop)
        try {
          return GodotJSWrapper.js2variant(obj[prop], p_exchange)
        } catch (e) {
          GodotRuntime.error(`Error getting variable ${prop} on object`, obj)
          return 0
        }
      }
      return GodotJSWrapper.js2variant(obj, p_exchange)
    }
    function _godot_js_wrapper_object_getvar(p_id, p_type, p_exchange) {
      const obj = GodotJSWrapper.get_proxied_value(p_id)
      if (obj === undefined) {
        return -1
      }
      const prop = GodotJSWrapper.variant2js(p_type, p_exchange)
      if (prop === undefined || prop === null) {
        return -1
      }
      try {
        return GodotJSWrapper.js2variant(obj[prop], p_exchange)
      } catch (e) {
        GodotRuntime.error(`Error getting variable ${prop} on object`, obj, e)
        return -1
      }
    }
    function _godot_js_wrapper_object_set(p_id, p_name, p_type, p_exchange) {
      const obj = GodotJSWrapper.get_proxied_value(p_id)
      if (obj === undefined) {
        return
      }
      const name = GodotRuntime.parseString(p_name)
      try {
        obj[name] = GodotJSWrapper.variant2js(p_type, p_exchange)
      } catch (e) {
        GodotRuntime.error(`Error setting variable ${name} on object`, obj)
      }
    }
    function _godot_js_wrapper_object_setvar(p_id, p_key_type, p_key_ex, p_val_type, p_val_ex) {
      const obj = GodotJSWrapper.get_proxied_value(p_id)
      if (obj === undefined) {
        return -1
      }
      const key = GodotJSWrapper.variant2js(p_key_type, p_key_ex)
      try {
        obj[key] = GodotJSWrapper.variant2js(p_val_type, p_val_ex)
        return 0
      } catch (e) {
        GodotRuntime.error(`Error setting variable ${key} on object`, obj)
        return -1
      }
    }
    function _godot_js_wrapper_object_unref(p_id) {
      const proxy = IDHandler.get(p_id)
      if (proxy !== undefined) {
        proxy.unref()
      }
    }
    var GodotWebXR = {
      gl: null,
      session: null,
      space: null,
      frame: null,
      pose: null,
      orig_requestAnimationFrame: null,
      requestAnimationFrame: (callback) => {
        if (GodotWebXR.session && GodotWebXR.space) {
          const onFrame = function (time, frame) {
            GodotWebXR.frame = frame
            GodotWebXR.pose = frame.getViewerPose(GodotWebXR.space)
            callback(time)
            GodotWebXR.frame = null
            GodotWebXR.pose = null
          }
          GodotWebXR.session.requestAnimationFrame(onFrame)
        } else {
          GodotWebXR.orig_requestAnimationFrame(callback)
        }
      },
      monkeyPatchRequestAnimationFrame: (enable) => {
        if (GodotWebXR.orig_requestAnimationFrame === null) {
          GodotWebXR.orig_requestAnimationFrame = Browser.requestAnimationFrame
        }
        Browser.requestAnimationFrame = enable
          ? GodotWebXR.requestAnimationFrame
          : GodotWebXR.orig_requestAnimationFrame
      },
      pauseResumeMainLoop: () => {
        Browser.mainLoop.pause()
        window.setTimeout(function () {
          Browser.mainLoop.resume()
        }, 0)
      },
      shaderProgram: null,
      programInfo: null,
      buffer: null,
      vsSource:
        '\n\t\t\tconst vec2 scale = vec2(0.5, 0.5);\n\t\t\tattribute vec4 aVertexPosition;\n\n\t\t\tvarying highp vec2 vTextureCoord;\n\n\t\t\tvoid main () {\n\t\t\t\tgl_Position = aVertexPosition;\n\t\t\t\tvTextureCoord = aVertexPosition.xy * scale + scale;\n\t\t\t}\n\t\t',
      fsSource:
        '\n\t\t\tvarying highp vec2 vTextureCoord;\n\n\t\t\tuniform sampler2D uSampler;\n\n\t\t\tvoid main() {\n\t\t\t\tgl_FragColor = texture2D(uSampler, vTextureCoord);\n\t\t\t}\n\t\t',
      initShaderProgram: (gl, vsSource, fsSource) => {
        const vertexShader = GodotWebXR.loadShader(gl, gl.VERTEX_SHADER, vsSource)
        const fragmentShader = GodotWebXR.loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
        const shaderProgram = gl.createProgram()
        gl.attachShader(shaderProgram, vertexShader)
        gl.attachShader(shaderProgram, fragmentShader)
        gl.linkProgram(shaderProgram)
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
          GodotRuntime.error(
            `Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`
          )
          return null
        }
        return shaderProgram
      },
      loadShader: (gl, type, source) => {
        const shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          GodotRuntime.error(
            `An error occurred compiling the shader: ${gl.getShaderInfoLog(shader)}`
          )
          gl.deleteShader(shader)
          return null
        }
        return shader
      },
      initBuffer: (gl) => {
        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        const positions = [-1, -1, 1, -1, -1, 1, 1, 1]
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
        return positionBuffer
      },
      blitTexture: (gl, texture) => {
        if (GodotWebXR.shaderProgram === null) {
          GodotWebXR.shaderProgram = GodotWebXR.initShaderProgram(
            gl,
            GodotWebXR.vsSource,
            GodotWebXR.fsSource
          )
          GodotWebXR.programInfo = {
            program: GodotWebXR.shaderProgram,
            attribLocations: {
              vertexPosition: gl.getAttribLocation(GodotWebXR.shaderProgram, 'aVertexPosition')
            },
            uniformLocations: {
              uSampler: gl.getUniformLocation(GodotWebXR.shaderProgram, 'uSampler')
            }
          }
          GodotWebXR.buffer = GodotWebXR.initBuffer(gl)
        }
        const orig_program = gl.getParameter(gl.CURRENT_PROGRAM)
        gl.useProgram(GodotWebXR.shaderProgram)
        gl.bindBuffer(gl.ARRAY_BUFFER, GodotWebXR.buffer)
        gl.vertexAttribPointer(
          GodotWebXR.programInfo.attribLocations.vertexPosition,
          2,
          gl.FLOAT,
          false,
          0,
          0
        )
        gl.enableVertexAttribArray(GodotWebXR.programInfo.attribLocations.vertexPosition)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.uniform1i(GodotWebXR.programInfo.uniformLocations.uSampler, 0)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        gl.bindTexture(gl.TEXTURE_2D, null)
        gl.disableVertexAttribArray(GodotWebXR.programInfo.attribLocations.vertexPosition)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        gl.useProgram(orig_program)
      },
      controllers: [],
      sampleControllers: () => {
        if (!GodotWebXR.session) {
          return
        }
        let other_index = 2
        const controllers = []
        GodotWebXR.session.inputSources.forEach((input_source) => {
          if (input_source.targetRayMode === 'tracked-pointer') {
            if (input_source.handedness === 'right') {
              controllers[1] = input_source
            } else if (input_source.handedness === 'left' || !controllers[0]) {
              controllers[0] = input_source
            }
          } else {
            controllers[other_index++] = input_source
          }
        })
        GodotWebXR.controllers = controllers
      },
      getControllerId: (input_source) => GodotWebXR.controllers.indexOf(input_source)
    }
    function _godot_webxr_commit_for_eye(p_eye, p_texture_id) {
      if (!GodotWebXR.session || !GodotWebXR.pose) {
        return
      }
      const view_index = p_eye === 2 ? 1 : 0
      const glLayer = GodotWebXR.session.renderState.baseLayer
      const view = GodotWebXR.pose.views[view_index]
      const viewport = glLayer.getViewport(view)
      const gl = GodotWebXR.gl
      const orig_framebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING)
      const orig_viewport = gl.getParameter(gl.VIEWPORT)
      gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer)
      gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height)
      GodotWebXR.blitTexture(gl, GL.textures[p_texture_id])
      gl.bindFramebuffer(gl.FRAMEBUFFER, orig_framebuffer)
      gl.viewport(orig_viewport[0], orig_viewport[1], orig_viewport[2], orig_viewport[3])
    }
    function _godot_webxr_get_bounds_geometry() {
      if (!GodotWebXR.space || !GodotWebXR.space.boundsGeometry) {
        return 0
      }
      const point_count = GodotWebXR.space.boundsGeometry.length
      if (point_count === 0) {
        return 0
      }
      const buf = GodotRuntime.malloc((point_count * 3 + 1) * 4)
      GodotRuntime.setHeapValue(buf, point_count, 'i32')
      for (let i = 0; i < point_count; i++) {
        const point = GodotWebXR.space.boundsGeometry[i]
        GodotRuntime.setHeapValue(buf + (i * 3 + 1) * 4, point.x, 'float')
        GodotRuntime.setHeapValue(buf + (i * 3 + 2) * 4, point.y, 'float')
        GodotRuntime.setHeapValue(buf + (i * 3 + 3) * 4, point.z, 'float')
      }
      return buf
    }
    function _godot_webxr_get_controller_axes(p_controller, p_xr_standard_mapping) {
      if (GodotWebXR.controllers.length === 0) {
        return 0
      }
      const controller = GodotWebXR.controllers[p_controller]
      if (!controller || !controller.gamepad) {
        return 0
      }
      let axes = controller.gamepad.axes
      if (controller.gamepad.mapping === 'xr-standard') {
        if (p_xr_standard_mapping) {
          const trigger_axis = controller.gamepad.buttons[0].value
          const grip_axis = controller.gamepad.buttons[1].value
          axes = [
            axes[2],
            axes[3] * -1,
            trigger_axis,
            grip_axis,
            grip_axis,
            0,
            axes[0],
            axes[1] * -1
          ]
        } else {
          axes[1] *= -1
          axes[3] *= -1
        }
      }
      const buf = GodotRuntime.malloc((axes.length + 1) * 4)
      GodotRuntime.setHeapValue(buf, axes.length, 'i32')
      for (let i = 0; i < axes.length; i++) {
        GodotRuntime.setHeapValue(buf + 4 + i * 4, axes[i], 'float')
      }
      return buf
    }
    function _godot_webxr_get_controller_buttons(p_controller, p_xr_standard_mapping) {
      if (GodotWebXR.controllers.length === 0) {
        return 0
      }
      const controller = GodotWebXR.controllers[p_controller]
      if (!controller || !controller.gamepad) {
        return 0
      }
      let buttons = controller.gamepad.buttons
      if (controller.gamepad.mapping === 'xr-standard' && p_xr_standard_mapping) {
        buttons = [
          0,
          buttons[5],
          buttons[1],
          buttons[3],
          buttons[6],
          buttons[7],
          buttons[8],
          buttons[4],
          buttons[9],
          buttons[10],
          buttons[11],
          buttons[12],
          buttons[13],
          buttons[14],
          buttons[2],
          buttons[0]
        ]
      }
      const buf = GodotRuntime.malloc((buttons.length + 1) * 4)
      GodotRuntime.setHeapValue(buf, buttons.length, 'i32')
      for (let i = 0; i < buttons.length; i++) {
        GodotRuntime.setHeapValue(buf + 4 + i * 4, buttons[i] ? buttons[i].value : 0, 'float')
      }
      return buf
    }
    function _godot_webxr_get_controller_count() {
      if (!GodotWebXR.session || !GodotWebXR.frame) {
        return 0
      }
      return GodotWebXR.controllers.length
    }
    function _godot_webxr_get_controller_target_ray_mode(p_controller) {
      if (p_controller < 0 || p_controller >= GodotWebXR.controllers.length) {
        return 0
      }
      const controller = GodotWebXR.controllers[p_controller]
      if (!controller) {
        return 0
      }
      switch (controller.targetRayMode) {
        case 'gaze':
          return 1
        case 'tracked-pointer':
          return 2
        case 'screen':
          return 3
        default:
          break
      }
      return 0
    }
    function _godot_webxr_get_controller_transform(p_controller) {
      if (!GodotWebXR.session || !GodotWebXR.frame) {
        return 0
      }
      const controller = GodotWebXR.controllers[p_controller]
      if (!controller) {
        return 0
      }
      const frame = GodotWebXR.frame
      const space = GodotWebXR.space
      const pose = frame.getPose(controller.targetRaySpace, space)
      if (!pose) {
        return 0
      }
      const matrix = pose.transform.matrix
      const buf = GodotRuntime.malloc(16 * 4)
      for (let i = 0; i < 16; i++) {
        GodotRuntime.setHeapValue(buf + i * 4, matrix[i], 'float')
      }
      return buf
    }
    function _godot_webxr_get_projection_for_eye(p_eye) {
      if (!GodotWebXR.session || !GodotWebXR.pose) {
        return 0
      }
      const view_index = p_eye === 2 ? 1 : 0
      const matrix = GodotWebXR.pose.views[view_index].projectionMatrix
      const buf = GodotRuntime.malloc(16 * 4)
      for (let i = 0; i < 16; i++) {
        GodotRuntime.setHeapValue(buf + i * 4, matrix[i], 'float')
      }
      return buf
    }
    function _godot_webxr_get_render_targetsize() {
      if (!GodotWebXR.session || !GodotWebXR.pose) {
        return 0
      }
      const glLayer = GodotWebXR.session.renderState.baseLayer
      const view = GodotWebXR.pose.views[0]
      const viewport = glLayer.getViewport(view)
      const buf = GodotRuntime.malloc(2 * 4)
      GodotRuntime.setHeapValue(buf + 0, viewport.width, 'i32')
      GodotRuntime.setHeapValue(buf + 4, viewport.height, 'i32')
      return buf
    }
    function _godot_webxr_get_transform_for_eye(p_eye) {
      if (!GodotWebXR.session || !GodotWebXR.pose) {
        return 0
      }
      const views = GodotWebXR.pose.views
      let matrix
      if (p_eye === 0) {
        matrix = GodotWebXR.pose.transform.matrix
      } else {
        matrix = views[p_eye - 1].transform.matrix
      }
      const buf = GodotRuntime.malloc(16 * 4)
      for (let i = 0; i < 16; i++) {
        GodotRuntime.setHeapValue(buf + i * 4, matrix[i], 'float')
      }
      return buf
    }
    function _godot_webxr_get_view_count() {
      if (!GodotWebXR.session || !GodotWebXR.pose) {
        return 0
      }
      return GodotWebXR.pose.views.length
    }
    function _godot_webxr_get_visibility_state() {
      if (!GodotWebXR.session || !GodotWebXR.session.visibilityState) {
        return 0
      }
      return GodotRuntime.allocString(GodotWebXR.session.visibilityState)
    }
    function _godot_webxr_initialize(
      p_session_mode,
      p_required_features,
      p_optional_features,
      p_requested_reference_spaces,
      p_on_session_started,
      p_on_session_ended,
      p_on_session_failed,
      p_on_controller_changed,
      p_on_input_event,
      p_on_simple_event
    ) {
      GodotWebXR.monkeyPatchRequestAnimationFrame(true)
      const session_mode = GodotRuntime.parseString(p_session_mode)
      const required_features = GodotRuntime.parseString(p_required_features)
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s !== '')
      const optional_features = GodotRuntime.parseString(p_optional_features)
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s !== '')
      const requested_reference_space_types = GodotRuntime.parseString(p_requested_reference_spaces)
        .split(',')
        .map((s) => s.trim())
      const onstarted = GodotRuntime.get_func(p_on_session_started)
      const onended = GodotRuntime.get_func(p_on_session_ended)
      const onfailed = GodotRuntime.get_func(p_on_session_failed)
      const oncontroller = GodotRuntime.get_func(p_on_controller_changed)
      const oninputevent = GodotRuntime.get_func(p_on_input_event)
      const onsimpleevent = GodotRuntime.get_func(p_on_simple_event)
      const session_init = {}
      if (required_features.length > 0) {
        session_init['requiredFeatures'] = required_features
      }
      if (optional_features.length > 0) {
        session_init['optionalFeatures'] = optional_features
      }
      navigator.xr
        .requestSession(session_mode, session_init)
        .then(function (session) {
          GodotWebXR.session = session
          session.addEventListener('end', function (evt) {
            onended()
          })
          session.addEventListener('inputsourceschange', function (evt) {
            let controller_changed = false
            ;[evt.added, evt.removed].forEach((lst) => {
              lst.forEach((input_source) => {
                if (input_source.targetRayMode === 'tracked-pointer') {
                  controller_changed = true
                }
              })
            })
            if (controller_changed) {
              oncontroller()
            }
          })
          ;['selectstart', 'selectend', 'select', 'squeezestart', 'squeezeend', 'squeeze'].forEach(
            (input_event, index) => {
              session.addEventListener(input_event, function (evt) {
                GodotWebXR.sampleControllers()
                oninputevent(index, GodotWebXR.getControllerId(evt.inputSource))
              })
            }
          )
          session.addEventListener('visibilitychange', function (evt) {
            const c_str = GodotRuntime.allocString('visibility_state_changed')
            onsimpleevent(c_str)
            GodotRuntime.free(c_str)
          })
          const gl_context_handle = _emscripten_webgl_get_current_context()
          const gl = GL.getContext(gl_context_handle).GLctx
          GodotWebXR.gl = gl
          gl.makeXRCompatible()
            .then(function () {
              session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl) })
              function onReferenceSpaceSuccess(reference_space, reference_space_type) {
                GodotWebXR.space = reference_space
                reference_space.onreset = function (evt) {
                  const c_str = GodotRuntime.allocString('reference_space_reset')
                  onsimpleevent(c_str)
                  GodotRuntime.free(c_str)
                }
                GodotWebXR.pauseResumeMainLoop()
                window.setTimeout(function () {
                  const c_str = GodotRuntime.allocString(reference_space_type)
                  onstarted(c_str)
                  GodotRuntime.free(c_str)
                }, 0)
              }
              function requestReferenceSpace() {
                const reference_space_type = requested_reference_space_types.shift()
                session
                  .requestReferenceSpace(reference_space_type)
                  .then((refSpace) => {
                    onReferenceSpaceSuccess(refSpace, reference_space_type)
                  })
                  .catch(() => {
                    if (requested_reference_space_types.length === 0) {
                      const c_str = GodotRuntime.allocString(
                        'Unable to get any of the requested reference space types'
                      )
                      onfailed(c_str)
                      GodotRuntime.free(c_str)
                    } else {
                      requestReferenceSpace()
                    }
                  })
              }
              requestReferenceSpace()
            })
            .catch(function (error) {
              const c_str = GodotRuntime.allocString(
                `Unable to make WebGL context compatible with WebXR: ${error}`
              )
              onfailed(c_str)
              GodotRuntime.free(c_str)
            })
        })
        .catch(function (error) {
          const c_str = GodotRuntime.allocString(`Unable to start session: ${error}`)
          onfailed(c_str)
          GodotRuntime.free(c_str)
        })
    }
    function _godot_webxr_is_controller_connected(p_controller) {
      if (!GodotWebXR.session || !GodotWebXR.frame) {
        return false
      }
      return !!GodotWebXR.controllers[p_controller]
    }
    function _godot_webxr_is_session_supported(p_session_mode, p_callback) {
      const session_mode = GodotRuntime.parseString(p_session_mode)
      const cb = GodotRuntime.get_func(p_callback)
      if (navigator.xr) {
        navigator.xr.isSessionSupported(session_mode).then(function (supported) {
          const c_str = GodotRuntime.allocString(session_mode)
          cb(c_str, supported ? 1 : 0)
          GodotRuntime.free(c_str)
        })
      } else {
        const c_str = GodotRuntime.allocString(session_mode)
        cb(c_str, 0)
        GodotRuntime.free(c_str)
      }
    }
    function _godot_webxr_is_supported() {
      return !!navigator.xr
    }
    function _godot_webxr_sample_controller_data() {
      GodotWebXR.sampleControllers()
    }
    function _godot_webxr_uninitialize() {
      if (GodotWebXR.session) {
        GodotWebXR.session.end().catch((e) => {})
      }
      GodotWebXR.session = null
      GodotWebXR.space = null
      GodotWebXR.frame = null
      GodotWebXR.pose = null
      GodotWebXR.monkeyPatchRequestAnimationFrame(false)
      GodotWebXR.pauseResumeMainLoop()
    }
    function _kill(pid, sig) {
      ___setErrNo(ERRNO_CODES.EPERM)
      return -1
    }
    function _llvm_eh_typeid_for(type) {
      return type
    }
    function _tzset() {
      if (_tzset.called) return
      _tzset.called = true
      HEAP32[__get_timezone() >> 2] = new Date().getTimezoneOffset() * 60
      var currentYear = new Date().getFullYear()
      var winter = new Date(currentYear, 0, 1)
      var summer = new Date(currentYear, 6, 1)
      HEAP32[__get_daylight() >> 2] = Number(
        winter.getTimezoneOffset() != summer.getTimezoneOffset()
      )
      function extractZone(date) {
        var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/)
        return match ? match[1] : 'GMT'
      }
      var winterName = extractZone(winter)
      var summerName = extractZone(summer)
      var winterNamePtr = allocateUTF8(winterName)
      var summerNamePtr = allocateUTF8(summerName)
      if (summer.getTimezoneOffset() < winter.getTimezoneOffset()) {
        HEAP32[__get_tzname() >> 2] = winterNamePtr
        HEAP32[(__get_tzname() + 4) >> 2] = summerNamePtr
      } else {
        HEAP32[__get_tzname() >> 2] = summerNamePtr
        HEAP32[(__get_tzname() + 4) >> 2] = winterNamePtr
      }
    }
    function _localtime_r(time, tmPtr) {
      _tzset()
      var date = new Date(HEAP32[time >> 2] * 1e3)
      HEAP32[tmPtr >> 2] = date.getSeconds()
      HEAP32[(tmPtr + 4) >> 2] = date.getMinutes()
      HEAP32[(tmPtr + 8) >> 2] = date.getHours()
      HEAP32[(tmPtr + 12) >> 2] = date.getDate()
      HEAP32[(tmPtr + 16) >> 2] = date.getMonth()
      HEAP32[(tmPtr + 20) >> 2] = date.getFullYear() - 1900
      HEAP32[(tmPtr + 24) >> 2] = date.getDay()
      var start = new Date(date.getFullYear(), 0, 1)
      var yday = ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0
      HEAP32[(tmPtr + 28) >> 2] = yday
      HEAP32[(tmPtr + 36) >> 2] = -(date.getTimezoneOffset() * 60)
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset()
      var winterOffset = start.getTimezoneOffset()
      var dst =
        (summerOffset != winterOffset &&
          date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0
      HEAP32[(tmPtr + 32) >> 2] = dst
      var zonePtr = HEAP32[(__get_tzname() + (dst ? 4 : 0)) >> 2]
      HEAP32[(tmPtr + 40) >> 2] = zonePtr
      return tmPtr
    }
    var MONO = {
      pump_count: 0,
      timeout_queue: [],
      mono_wasm_runtime_is_ready: false,
      mono_wasm_ignore_pdb_load_errors: true,
      pump_message: function () {
        if (!this.mono_background_exec)
          this.mono_background_exec = Module.cwrap('mono_background_exec', null)
        while (MONO.timeout_queue.length > 0) {
          --MONO.pump_count
          MONO.timeout_queue.shift()()
        }
        while (MONO.pump_count > 0) {
          --MONO.pump_count
          this.mono_background_exec()
        }
      },
      export_functions: function (module) {
        module['pump_message'] = MONO.pump_message
        module['mono_load_runtime_and_bcl'] = MONO.mono_load_runtime_and_bcl
      },
      mono_wasm_get_call_stack: function () {
        if (!this.mono_wasm_current_bp_id)
          this.mono_wasm_current_bp_id = Module.cwrap('mono_wasm_current_bp_id', 'number')
        if (!this.mono_wasm_enum_frames)
          this.mono_wasm_enum_frames = Module.cwrap('mono_wasm_enum_frames', null)
        var bp_id = this.mono_wasm_current_bp_id()
        this.active_frames = []
        this.mono_wasm_enum_frames()
        var the_frames = this.active_frames
        this.active_frames = []
        return { breakpoint_id: bp_id, frames: the_frames }
      },
      mono_wasm_get_variables: function (scope, var_list) {
        if (!this.mono_wasm_get_var_info)
          this.mono_wasm_get_var_info = Module.cwrap('mono_wasm_get_var_info', null, [
            'number',
            'number',
            'number'
          ])
        this.var_info = []
        var numBytes = var_list.length * Int32Array.BYTES_PER_ELEMENT
        var ptr = Module._malloc(numBytes)
        var heapBytes = new Int32Array(Module.HEAP32.buffer, ptr, numBytes)
        for (let i = 0; i < var_list.length; i++) {
          heapBytes[i] = var_list[i]
        }
        this.mono_wasm_get_var_info(scope, heapBytes.byteOffset, var_list.length)
        Module._free(heapBytes.byteOffset)
        var res = this.var_info
        this.var_info = []
        return res
      },
      mono_wasm_get_object_properties: function (objId) {
        if (!this.mono_wasm_get_object_properties_info)
          this.mono_wasm_get_object_properties_info = Module.cwrap(
            'mono_wasm_get_object_properties',
            null,
            ['number']
          )
        this.var_info = []
        console.log('>> mono_wasm_get_object_properties ' + objId)
        this.mono_wasm_get_object_properties_info(objId)
        var res = this.var_info
        this.var_info = []
        return res
      },
      mono_wasm_get_array_values: function (objId) {
        if (!this.mono_wasm_get_array_values_info)
          this.mono_wasm_get_array_values_info = Module.cwrap('mono_wasm_get_array_values', null, [
            'number'
          ])
        this.var_info = []
        console.log('>> mono_wasm_get_array_values ' + objId)
        this.mono_wasm_get_array_values_info(objId)
        var res = this.var_info
        this.var_info = []
        return res
      },
      mono_wasm_start_single_stepping: function (kind) {
        console.log('>> mono_wasm_start_single_stepping ' + kind)
        if (!this.mono_wasm_setup_single_step)
          this.mono_wasm_setup_single_step = Module.cwrap('mono_wasm_setup_single_step', null, [
            'number'
          ])
        this.mono_wasm_setup_single_step(kind)
      },
      mono_wasm_runtime_ready: function () {
        console.log('MONO-WASM: Runtime is ready.')
        this.mono_wasm_runtime_is_ready = true
        debugger
      },
      mono_wasm_set_breakpoint: function (assembly, method_token, il_offset) {
        if (!this.mono_wasm_set_bp)
          this.mono_wasm_set_bp = Module.cwrap('mono_wasm_set_breakpoint', 'number', [
            'string',
            'number',
            'number'
          ])
        return this.mono_wasm_set_bp(assembly, method_token, il_offset)
      },
      mono_wasm_remove_breakpoint: function (breakpoint_id) {
        if (!this.mono_wasm_del_bp)
          this.mono_wasm_del_bp = Module.cwrap('mono_wasm_remove_breakpoint', 'number', ['number'])
        return this.mono_wasm_del_bp(breakpoint_id)
      },
      mono_wasm_setenv: function (name, value) {
        if (!this.wasm_setenv)
          this.wasm_setenv = Module.cwrap('mono_wasm_setenv', null, ['string', 'string'])
        this.wasm_setenv(name, value)
      },
      mono_wasm_set_runtime_options: function (options) {
        if (!this.wasm_parse_runtime_options)
          this.wasm_parse_runtime_options = Module.cwrap('mono_wasm_parse_runtime_options', null, [
            'number',
            'number'
          ])
        var argv = Module._malloc(options.length * 4)
        var wasm_strdup = Module.cwrap('mono_wasm_strdup', 'number', ['string'])
        aindex = 0
        for (var i = 0; i < options.length; ++i) {
          Module.setValue(argv + aindex * 4, wasm_strdup(options[i]), 'i32')
          aindex += 1
        }
        this.wasm_parse_runtime_options(options.length, argv)
      },
      mono_wasm_init_aot_profiler: function (options) {
        if (options == null) options = {}
        if (!('write_at' in options)) options.write_at = 'WebAssembly.Runtime::StopProfile'
        if (!('send_to' in options)) options.send_to = 'WebAssembly.Runtime::DumpAotProfileData'
        var arg = 'aot:write-at-method=' + options.write_at + ',send-to-method=' + options.send_to
        Module.ccall('mono_wasm_load_profiler_aot', null, ['string'], [arg])
      },
      mono_load_runtime_and_bcl: function (
        vfs_prefix,
        deploy_prefix,
        enable_debugging,
        file_list,
        loaded_cb,
        fetch_file_cb
      ) {
        var pending = file_list.length
        var loaded_files = []
        var mono_wasm_add_assembly = Module.cwrap('mono_wasm_add_assembly', null, [
          'string',
          'number',
          'number'
        ])
        if (!fetch_file_cb) {
          if (ENVIRONMENT_IS_NODE) {
            var fs = require('fs')
            fetch_file_cb = function (asset) {
              console.log('MONO_WASM: Loading... ' + asset)
              var binary = fs.readFileSync(asset)
              var resolve_func2 = function (resolve, reject) {
                resolve(new Uint8Array(binary))
              }
              var resolve_func1 = function (resolve, reject) {
                var response = {
                  ok: true,
                  url: asset,
                  arrayBuffer: function () {
                    return new Promise(resolve_func2)
                  }
                }
                resolve(response)
              }
              return new Promise(resolve_func1)
            }
          } else {
            fetch_file_cb = function (asset) {
              return fetch(asset, { credentials: 'same-origin' })
            }
          }
        }
        file_list.forEach(function (file_name) {
          var fetch_promise = fetch_file_cb(locateFile(deploy_prefix + '/' + file_name))
          fetch_promise
            .then(function (response) {
              if (!response.ok) {
                if (
                  response.status === 404 &&
                  file_name.match(/\.pdb$/) &&
                  MONO.mono_wasm_ignore_pdb_load_errors
                ) {
                  --pending
                  throw "MONO-WASM: Skipping failed load for .pdb file: '" + file_name + "'"
                } else {
                  throw "MONO_WASM: Failed to load file: '" + file_name + "'"
                }
              } else {
                loaded_files.push(response.url)
                return response['arrayBuffer']()
              }
            })
            .then(function (blob) {
              var asm = new Uint8Array(blob)
              var memory = Module._malloc(asm.length)
              var heapBytes = new Uint8Array(Module.HEAPU8.buffer, memory, asm.length)
              heapBytes.set(asm)
              mono_wasm_add_assembly(file_name, memory, asm.length)
              console.log('MONO_WASM: Loaded: ' + file_name)
              --pending
              if (pending == 0) {
                MONO.loaded_files = loaded_files
                var load_runtime = Module.cwrap('mono_wasm_load_runtime', null, [
                  'string',
                  'number'
                ])
                console.log('MONO_WASM: Initializing mono runtime')
                if (ENVIRONMENT_IS_SHELL || ENVIRONMENT_IS_NODE) {
                  try {
                    load_runtime(vfs_prefix, enable_debugging)
                  } catch (ex) {
                    print('MONO_WASM: load_runtime () failed: ' + ex)
                    var err = new Error()
                    print('MONO_WASM: Stacktrace: \n')
                    print(err.stack)
                    var wasm_exit = Module.cwrap('mono_wasm_exit', null, ['number'])
                    wasm_exit(1)
                  }
                } else {
                  load_runtime(vfs_prefix, enable_debugging)
                }
                MONO.mono_wasm_runtime_ready()
                loaded_cb()
              }
            })
        })
      },
      mono_wasm_get_loaded_files: function () {
        console.log('>>>mono_wasm_get_loaded_files')
        return this.loaded_files
      },
      mono_wasm_clear_all_breakpoints: function () {
        if (!this.mono_clear_bps)
          this.mono_clear_bps = Module.cwrap('mono_wasm_clear_all_breakpoints', null)
        this.mono_clear_bps()
      }
    }
    function _mono_set_timeout(timeout, id) {
      if (!this.mono_set_timeout_exec)
        this.mono_set_timeout_exec = Module.cwrap('mono_set_timeout_exec', null, ['number'])
      if (ENVIRONMENT_IS_WEB) {
        window.setTimeout(function () {
          this.mono_set_timeout_exec(id)
        }, timeout)
      } else if (ENVIRONMENT_IS_WORKER) {
        self.setTimeout(function () {
          this.mono_set_timeout_exec(id)
        }, timeout)
      } else if (ENVIRONMENT_IS_NODE) {
        global.setTimeout(function () {
          global.mono_set_timeout_exec(id)
        }, timeout)
      } else {
        ++MONO.pump_count
        MONO.timeout_queue.push(function () {
          this.mono_set_timeout_exec(id)
        })
      }
    }
    function _mono_wasm_add_array_item(position) {
      MONO.var_info.push({ name: '[' + position + ']' })
    }
    function _mono_wasm_add_array_var(className, objectId) {
      if (objectId == 0) {
        MONO.var_info.push({
          value: {
            type: 'array',
            className: Module.UTF8ToString(className),
            description: Module.UTF8ToString(className),
            subtype: 'null'
          }
        })
      } else {
        MONO.var_info.push({
          value: {
            type: 'array',
            className: Module.UTF8ToString(className),
            description: Module.UTF8ToString(className),
            objectId: 'dotnet:array:' + objectId
          }
        })
      }
    }
    function _mono_wasm_add_bool_var(var_value) {
      MONO.var_info.push({ value: { type: 'boolean', value: var_value != 0 } })
    }
    function _mono_wasm_add_frame(il, method, name) {
      MONO.active_frames.push({
        il_pos: il,
        method_token: method,
        assembly_name: Module.UTF8ToString(name)
      })
    }
    function _mono_wasm_add_number_var(var_value) {
      MONO.var_info.push({ value: { type: 'number', value: var_value } })
    }
    function _mono_wasm_add_obj_var(className, objectId) {
      if (objectId == 0) {
        MONO.var_info.push({
          value: {
            type: 'object',
            className: Module.UTF8ToString(className),
            description: Module.UTF8ToString(className),
            subtype: 'null'
          }
        })
      } else {
        MONO.var_info.push({
          value: {
            type: 'object',
            className: Module.UTF8ToString(className),
            description: Module.UTF8ToString(className),
            objectId: 'dotnet:object:' + objectId
          }
        })
      }
    }
    function _mono_wasm_add_properties_var(name) {
      MONO.var_info.push({ name: Module.UTF8ToString(name) })
    }
    function _mono_wasm_add_string_var(var_value) {
      if (var_value == 0) {
        MONO.var_info.push({ value: { type: 'object', subtype: 'null' } })
      } else {
        MONO.var_info.push({ value: { type: 'string', value: Module.UTF8ToString(var_value) } })
      }
    }
    var BINDING = {
      BINDING_ASM: '[WebAssembly.Bindings]WebAssembly.Runtime',
      mono_wasm_object_registry: [],
      mono_wasm_ref_counter: 0,
      mono_wasm_free_list: [],
      mono_wasm_marshal_enum_as_int: false,
      mono_bindings_init: function (binding_asm) {
        this.BINDING_ASM = binding_asm
      },
      export_functions: function (module) {
        module['mono_bindings_init'] = BINDING.mono_bindings_init.bind(BINDING)
        module['mono_method_invoke'] = BINDING.call_method.bind(BINDING)
        module['mono_method_get_call_signature'] =
          BINDING.mono_method_get_call_signature.bind(BINDING)
        module['mono_method_resolve'] = BINDING.resolve_method_fqn.bind(BINDING)
        module['mono_bind_static_method'] = BINDING.bind_static_method.bind(BINDING)
        module['mono_call_static_method'] = BINDING.call_static_method.bind(BINDING)
        module['mono_bind_assembly_entry_point'] = BINDING.bind_assembly_entry_point.bind(BINDING)
        module['mono_call_assembly_entry_point'] = BINDING.call_assembly_entry_point.bind(BINDING)
      },
      bindings_lazy_init: function () {
        if (this.init) return
        this.assembly_load = Module.cwrap('mono_wasm_assembly_load', 'number', ['string'])
        this.find_class = Module.cwrap('mono_wasm_assembly_find_class', 'number', [
          'number',
          'string',
          'string'
        ])
        this.find_method = Module.cwrap('mono_wasm_assembly_find_method', 'number', [
          'number',
          'string',
          'number'
        ])
        this.invoke_method = Module.cwrap('mono_wasm_invoke_method', 'number', [
          'number',
          'number',
          'number',
          'number'
        ])
        this.mono_string_get_utf8 = Module.cwrap('mono_wasm_string_get_utf8', 'number', ['number'])
        this.js_string_to_mono_string = Module.cwrap('mono_wasm_string_from_js', 'number', [
          'string'
        ])
        this.mono_get_obj_type = Module.cwrap('mono_wasm_get_obj_type', 'number', ['number'])
        this.mono_unbox_int = Module.cwrap('mono_unbox_int', 'number', ['number'])
        this.mono_unbox_float = Module.cwrap('mono_wasm_unbox_float', 'number', ['number'])
        this.mono_array_length = Module.cwrap('mono_wasm_array_length', 'number', ['number'])
        this.mono_array_get = Module.cwrap('mono_wasm_array_get', 'number', ['number', 'number'])
        this.mono_obj_array_new = Module.cwrap('mono_wasm_obj_array_new', 'number', ['number'])
        this.mono_obj_array_set = Module.cwrap('mono_wasm_obj_array_set', 'void', [
          'number',
          'number',
          'number'
        ])
        this.mono_unbox_enum = Module.cwrap('mono_wasm_unbox_enum', 'number', ['number'])
        this.assembly_get_entry_point = Module.cwrap(
          'mono_wasm_assembly_get_entry_point',
          'number',
          ['number']
        )
        this.mono_typed_array_new = Module.cwrap('mono_wasm_typed_array_new', 'number', [
          'number',
          'number',
          'number',
          'number'
        ])
        var binding_fqn_asm = this.BINDING_ASM.substring(
          this.BINDING_ASM.indexOf('[') + 1,
          this.BINDING_ASM.indexOf(']')
        ).trim()
        var binding_fqn_class = this.BINDING_ASM.substring(this.BINDING_ASM.indexOf(']') + 1).trim()
        this.binding_module = this.assembly_load(binding_fqn_asm)
        if (!this.binding_module) throw "Can't find bindings module assembly: " + binding_fqn_asm
        if (binding_fqn_class !== null && typeof binding_fqn_class !== 'undefined') {
          var namespace = 'WebAssembly'
          var classname = binding_fqn_class.length > 0 ? binding_fqn_class : 'Runtime'
          if (binding_fqn_class.indexOf('.') != -1) {
            var idx = binding_fqn_class.lastIndexOf('.')
            namespace = binding_fqn_class.substring(0, idx)
            classname = binding_fqn_class.substring(idx + 1)
          }
        }
        var wasm_runtime_class = this.find_class(this.binding_module, namespace, classname)
        if (!wasm_runtime_class) throw "Can't find " + binding_fqn_class + ' class'
        var get_method = function (method_name) {
          var res = BINDING.find_method(wasm_runtime_class, method_name, -1)
          if (!res) throw "Can't find method " + namespace + '.' + classname + ':' + method_name
          return res
        }
        this.bind_js_obj = get_method('BindJSObject')
        this.bind_core_clr_obj = get_method('BindCoreCLRObject')
        this.bind_existing_obj = get_method('BindExistingObject')
        this.unbind_js_obj = get_method('UnBindJSObject')
        this.unbind_js_obj_and_free = get_method('UnBindJSObjectAndFree')
        this.unbind_raw_obj_and_free = get_method('UnBindRawJSObjectAndFree')
        this.get_js_id = get_method('GetJSObjectId')
        this.get_raw_mono_obj = get_method('GetMonoObject')
        this.box_js_int = get_method('BoxInt')
        this.box_js_double = get_method('BoxDouble')
        this.box_js_bool = get_method('BoxBool')
        this.is_simple_array = get_method('IsSimpleArray')
        this.get_core_type = get_method('GetCoreType')
        this.setup_js_cont = get_method('SetupJSContinuation')
        this.create_tcs = get_method('CreateTaskSource')
        this.set_tcs_result = get_method('SetTaskSourceResult')
        this.set_tcs_failure = get_method('SetTaskSourceFailure')
        this.tcs_get_task_and_bind = get_method('GetTaskAndBind')
        this.get_call_sig = get_method('GetCallSignature')
        this.object_to_string = get_method('ObjectToString')
        this.get_date_value = get_method('GetDateValue')
        this.create_date_time = get_method('CreateDateTime')
        this.create_uri = get_method('CreateUri')
        this.object_to_enum = get_method('ObjectToEnum')
        this.init = true
      },
      get_js_obj: function (js_handle) {
        if (js_handle > 0) return this.mono_wasm_require_handle(js_handle)
        return null
      },
      conv_string: function (mono_obj) {
        if (mono_obj == 0) return null
        var raw = this.mono_string_get_utf8(mono_obj)
        var res = Module.UTF8ToString(raw)
        Module._free(raw)
        return res
      },
      is_nested_array: function (ele) {
        return this.call_method(this.is_simple_array, null, 'mi', [ele])
      },
      mono_array_to_js_array: function (mono_array) {
        if (mono_array == 0) return null
        var res = []
        var len = this.mono_array_length(mono_array)
        for (var i = 0; i < len; ++i) {
          var ele = this.mono_array_get(mono_array, i)
          if (this.is_nested_array(ele)) res.push(this.mono_array_to_js_array(ele))
          else res.push(this.unbox_mono_obj(ele))
        }
        return res
      },
      js_array_to_mono_array: function (js_array) {
        var mono_array = this.mono_obj_array_new(js_array.length)
        for (var i = 0; i < js_array.length; ++i) {
          this.mono_obj_array_set(mono_array, i, this.js_to_mono_obj(js_array[i]))
        }
        return mono_array
      },
      unbox_mono_obj: function (mono_obj) {
        if (mono_obj == 0) return undefined
        var type = this.mono_get_obj_type(mono_obj)
        switch (type) {
          case 1:
            return this.mono_unbox_int(mono_obj)
          case 2:
            return this.mono_unbox_float(mono_obj)
          case 3:
            return this.conv_string(mono_obj)
          case 4:
            throw new Error('no idea on how to unbox value types')
          case 5: {
            var obj = this.extract_js_obj(mono_obj)
            return function () {
              return BINDING.invoke_delegate(obj, arguments)
            }
          }
          case 6: {
            if (typeof Promise === 'undefined' || typeof Promise.resolve === 'undefined')
              throw new Error(
                'Promises are not supported thus C# Tasks can not work in this context.'
              )
            var obj = this.extract_js_obj(mono_obj)
            var cont_obj = null
            var promise = new Promise(function (resolve, reject) {
              cont_obj = { resolve: resolve, reject: reject }
            })
            this.call_method(this.setup_js_cont, null, 'mo', [mono_obj, cont_obj])
            obj.__mono_js_cont__ = cont_obj.__mono_gchandle__
            cont_obj.__mono_js_task__ = obj.__mono_gchandle__
            return promise
          }
          case 7:
            return this.extract_js_obj(mono_obj)
          case 8:
            return this.mono_unbox_int(mono_obj) != 0
          case 9:
            if (this.mono_wasm_marshal_enum_as_int) {
              return this.mono_unbox_enum(mono_obj)
            } else {
              enumValue = this.call_method(this.object_to_string, null, 'm', [mono_obj])
            }
            return enumValue
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18: {
            throw new Error(
              'Marshalling of primitive arrays are not supported.  Use the corresponding TypedArray instead.'
            )
          }
          case 20:
            var dateValue = this.call_method(this.get_date_value, null, 'md', [mono_obj])
            return new Date(dateValue)
          case 21:
            var dateoffsetValue = this.call_method(this.object_to_string, null, 'm', [mono_obj])
            return dateoffsetValue
          case 22:
            var uriValue = this.call_method(this.object_to_string, null, 'm', [mono_obj])
            return uriValue
          default:
            throw new Error('no idea on how to unbox object kind ' + type)
        }
      },
      create_task_completion_source: function () {
        return this.call_method(this.create_tcs, null, 'i', [-1])
      },
      set_task_result: function (tcs, result) {
        tcs.is_mono_tcs_result_set = true
        this.call_method(this.set_tcs_result, null, 'oo', [tcs, result])
        if (tcs.is_mono_tcs_task_bound) this.free_task_completion_source(tcs)
      },
      set_task_failure: function (tcs, reason) {
        tcs.is_mono_tcs_result_set = true
        this.call_method(this.set_tcs_failure, null, 'os', [tcs, reason.toString()])
        if (tcs.is_mono_tcs_task_bound) this.free_task_completion_source(tcs)
      },
      js_typedarray_to_heap: function (typedArray) {
        var numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT
        var ptr = Module._malloc(numBytes)
        var heapBytes = new Uint8Array(Module.HEAPU8.buffer, ptr, numBytes)
        heapBytes.set(new Uint8Array(typedArray.buffer, typedArray.byteOffset, numBytes))
        return heapBytes
      },
      js_to_mono_obj: function (js_obj) {
        this.bindings_lazy_init()
        function isThenable() {
          return (
            Promise.resolve(js_obj) === js_obj ||
            ((typeof js_obj === 'object' || typeof js_obj === 'function') &&
              typeof js_obj.then === 'function')
          )
        }
        switch (true) {
          case js_obj === null:
          case typeof js_obj === 'undefined':
            return 0
          case typeof js_obj === 'number':
            if (parseInt(js_obj) == js_obj)
              return this.call_method(this.box_js_int, null, 'im', [js_obj])
            return this.call_method(this.box_js_double, null, 'dm', [js_obj])
          case typeof js_obj === 'string':
            return this.js_string_to_mono_string(js_obj)
          case typeof js_obj === 'boolean':
            return this.call_method(this.box_js_bool, null, 'im', [js_obj])
          case isThenable() === true:
            var the_task = this.try_extract_mono_obj(js_obj)
            if (the_task) return the_task
            var tcs = this.create_task_completion_source()
            js_obj.then(
              function (result) {
                BINDING.set_task_result(tcs, result)
              },
              function (reason) {
                BINDING.set_task_failure(tcs, reason)
              }
            )
            return this.get_task_and_bind(tcs, js_obj)
          case js_obj.constructor.name === 'Date':
            return this.call_method(this.create_date_time, null, 'dm', [js_obj.getTime()])
          default:
            return this.extract_mono_obj(js_obj)
        }
      },
      js_to_mono_uri: function (js_obj) {
        this.bindings_lazy_init()
        switch (true) {
          case js_obj === null:
          case typeof js_obj === 'undefined':
            return 0
          case typeof js_obj === 'string':
            return this.call_method(this.create_uri, null, 'sm', [js_obj])
          default:
            return this.extract_mono_obj(js_obj)
        }
      },
      js_typed_array_to_array: function (js_obj) {
        if (!!(js_obj.buffer instanceof ArrayBuffer && js_obj.BYTES_PER_ELEMENT)) {
          var arrayType = 0
          if (js_obj instanceof Int8Array) arrayType = 11
          if (js_obj instanceof Uint8Array) arrayType = 12
          if (js_obj instanceof Uint8ClampedArray) arrayType = 12
          if (js_obj instanceof Int16Array) arrayType = 13
          if (js_obj instanceof Uint16Array) arrayType = 14
          if (js_obj instanceof Int32Array) arrayType = 15
          if (js_obj instanceof Uint32Array) arrayType = 16
          if (js_obj instanceof Float32Array) arrayType = 17
          if (js_obj instanceof Float64Array) arrayType = 18
          var heapBytes = this.js_typedarray_to_heap(js_obj)
          var bufferArray = this.mono_typed_array_new(
            heapBytes.byteOffset,
            js_obj.length,
            js_obj.BYTES_PER_ELEMENT,
            arrayType
          )
          Module._free(heapBytes.byteOffset)
          return bufferArray
        } else {
          throw new Error("Object '" + js_obj + "' is not a typed array")
        }
      },
      typedarray_copy_to: function (typed_array, pinned_array, begin, end, bytes_per_element) {
        if (!!(typed_array.buffer instanceof ArrayBuffer && typed_array.BYTES_PER_ELEMENT)) {
          if (bytes_per_element !== typed_array.BYTES_PER_ELEMENT)
            throw new Error(
              "Inconsistent element sizes: TypedArray.BYTES_PER_ELEMENT '" +
                typed_array.BYTES_PER_ELEMENT +
                "' sizeof managed element: '" +
                bytes_per_element +
                "'"
            )
          var num_of_bytes = (end - begin) * bytes_per_element
          var view_bytes = typed_array.length * typed_array.BYTES_PER_ELEMENT
          if (num_of_bytes > view_bytes) num_of_bytes = view_bytes
          var offset = begin * bytes_per_element
          var heapBytes = new Uint8Array(Module.HEAPU8.buffer, pinned_array + offset, num_of_bytes)
          heapBytes.set(new Uint8Array(typed_array.buffer, typed_array.byteOffset, num_of_bytes))
          return num_of_bytes
        } else {
          throw new Error("Object '" + typed_array + "' is not a typed array")
        }
      },
      typedarray_copy_from: function (typed_array, pinned_array, begin, end, bytes_per_element) {
        if (!!(typed_array.buffer instanceof ArrayBuffer && typed_array.BYTES_PER_ELEMENT)) {
          if (bytes_per_element !== typed_array.BYTES_PER_ELEMENT)
            throw new Error(
              "Inconsistent element sizes: TypedArray.BYTES_PER_ELEMENT '" +
                typed_array.BYTES_PER_ELEMENT +
                "' sizeof managed element: '" +
                bytes_per_element +
                "'"
            )
          var num_of_bytes = (end - begin) * bytes_per_element
          var view_bytes = typed_array.length * typed_array.BYTES_PER_ELEMENT
          if (num_of_bytes > view_bytes) num_of_bytes = view_bytes
          var typedarrayBytes = new Uint8Array(typed_array.buffer, 0, num_of_bytes)
          var offset = begin * bytes_per_element
          typedarrayBytes.set(
            Module.HEAPU8.subarray(pinned_array + offset, pinned_array + offset + num_of_bytes)
          )
          return num_of_bytes
        } else {
          throw new Error("Object '" + typed_array + "' is not a typed array")
        }
      },
      typed_array_from: function (pinned_array, begin, end, bytes_per_element, type) {
        var newTypedArray = 0
        switch (type) {
          case 5:
            newTypedArray = new Int8Array(end - begin)
            break
          case 6:
            newTypedArray = new Uint8Array(end - begin)
            break
          case 7:
            newTypedArray = new Int16Array(end - begin)
            break
          case 8:
            newTypedArray = new Uint16Array(end - begin)
            break
          case 9:
            newTypedArray = new Int32Array(end - begin)
            break
          case 10:
            newTypedArray = new Uint32Array(end - begin)
            break
          case 13:
            newTypedArray = new Float32Array(end - begin)
            break
          case 14:
            newTypedArray = new Float64Array(end - begin)
            break
          case 15:
            newTypedArray = new Uint8ClampedArray(end - begin)
            break
        }
        this.typedarray_copy_from(newTypedArray, pinned_array, begin, end, bytes_per_element)
        return newTypedArray
      },
      js_to_mono_enum: function (method, parmIdx, js_obj) {
        this.bindings_lazy_init()
        if (js_obj === null || typeof js_obj === 'undefined') return 0
        var monoObj = this.js_to_mono_obj(js_obj)
        var monoEnum = this.call_method(this.object_to_enum, null, 'iimm', [
          method,
          parmIdx,
          monoObj
        ])
        return this.mono_unbox_enum(monoEnum)
      },
      wasm_binding_obj_new: function (js_obj_id, type) {
        return this.call_method(this.bind_js_obj, null, 'io', [js_obj_id, type])
      },
      wasm_bind_existing: function (mono_obj, js_id) {
        return this.call_method(this.bind_existing_obj, null, 'mi', [mono_obj, js_id])
      },
      wasm_bind_core_clr_obj: function (js_id, gc_handle) {
        return this.call_method(this.bind_core_clr_obj, null, 'ii', [js_id, gc_handle])
      },
      wasm_unbind_js_obj: function (js_obj_id) {
        this.call_method(this.unbind_js_obj, null, 'i', [js_obj_id])
      },
      wasm_unbind_js_obj_and_free: function (js_obj_id) {
        this.call_method(this.unbind_js_obj_and_free, null, 'i', [js_obj_id])
      },
      wasm_get_js_id: function (mono_obj) {
        return this.call_method(this.get_js_id, null, 'm', [mono_obj])
      },
      wasm_get_raw_obj: function (gchandle) {
        return this.call_method(this.get_raw_mono_obj, null, 'im', [gchandle])
      },
      try_extract_mono_obj: function (js_obj) {
        if (
          js_obj === null ||
          typeof js_obj === 'undefined' ||
          typeof js_obj.__mono_gchandle__ === 'undefined'
        )
          return 0
        return this.wasm_get_raw_obj(js_obj.__mono_gchandle__)
      },
      mono_method_get_call_signature: function (method) {
        this.bindings_lazy_init()
        return this.call_method(this.get_call_sig, null, 'i', [method])
      },
      get_task_and_bind: function (tcs, js_obj) {
        var gc_handle = this.mono_wasm_free_list.length
          ? this.mono_wasm_free_list.pop()
          : this.mono_wasm_ref_counter++
        var task_gchandle = this.call_method(this.tcs_get_task_and_bind, null, 'oi', [
          tcs,
          gc_handle + 1
        ])
        js_obj.__mono_gchandle__ = task_gchandle
        this.mono_wasm_object_registry[gc_handle] = js_obj
        this.free_task_completion_source(tcs)
        tcs.is_mono_tcs_task_bound = true
        js_obj.__mono_bound_tcs__ = tcs.__mono_gchandle__
        tcs.__mono_bound_task__ = js_obj.__mono_gchandle__
        return this.wasm_get_raw_obj(js_obj.__mono_gchandle__)
      },
      free_task_completion_source: function (tcs) {
        if (tcs.is_mono_tcs_result_set) {
          this.call_method(this.unbind_raw_obj_and_free, null, 'ii', [tcs.__mono_gchandle__])
        }
        if (tcs.__mono_bound_task__) {
          this.call_method(this.unbind_raw_obj_and_free, null, 'ii', [tcs.__mono_bound_task__])
        }
      },
      extract_mono_obj: function (js_obj) {
        if (js_obj === null || typeof js_obj === 'undefined') return 0
        if (!js_obj.is_mono_bridged_obj) {
          var gc_handle = this.mono_wasm_register_obj(js_obj)
          return this.wasm_get_raw_obj(gc_handle)
        }
        return this.wasm_get_raw_obj(js_obj.__mono_gchandle__)
      },
      extract_js_obj: function (mono_obj) {
        if (mono_obj == 0) return null
        var js_id = this.wasm_get_js_id(mono_obj)
        if (js_id > 0) return this.mono_wasm_require_handle(js_id)
        var gcHandle = this.mono_wasm_free_list.length
          ? this.mono_wasm_free_list.pop()
          : this.mono_wasm_ref_counter++
        var js_obj = {
          __mono_gchandle__: this.wasm_bind_existing(mono_obj, gcHandle + 1),
          is_mono_bridged_obj: true
        }
        this.mono_wasm_object_registry[gcHandle] = js_obj
        return js_obj
      },
      call_method: function (method, this_arg, args_marshal, args) {
        this.bindings_lazy_init()
        var out_exc = Module._malloc(4)
        var args_mem = null
        var has_args = args !== null && typeof args !== 'undefined' && args.length > 0
        var has_args_marshal =
          args_marshal !== null && typeof args_marshal !== 'undefined' && args_marshal.length > 0
        if (has_args_marshal && (!has_args || args.length < args_marshal.leghth))
          throw Error('Parameter count mismatch.')
        if (has_args_marshal && has_args) {
          var extra_args_mem = 0
          for (var i = 0; i < args.length; ++i) {
            if (
              args_marshal[i] == 'i' ||
              args_marshal[i] == 'f' ||
              args_marshal[i] == 'l' ||
              args_marshal[i] == 'd' ||
              args_marshal[i] == 'j' ||
              args_marshal[i] == 'k'
            )
              extra_args_mem += 8
          }
          var extra_args_mem = extra_args_mem ? Module._malloc(extra_args_mem) : 0
          var extra_arg_idx = 0
          args_mem = Module._malloc(args.length * 4)
          for (var i = 0; i < args.length; ++i) {
            if (args_marshal[i] == 's') {
              Module.setValue(args_mem + i * 4, this.js_string_to_mono_string(args[i]), 'i32')
            } else if (args_marshal[i] == 'm') {
              Module.setValue(args_mem + i * 4, args[i], 'i32')
            } else if (args_marshal[i] == 'o') {
              Module.setValue(args_mem + i * 4, this.js_to_mono_obj(args[i]), 'i32')
            } else if (args_marshal[i] == 'u') {
              Module.setValue(args_mem + i * 4, this.js_to_mono_uri(args[i]), 'i32')
            } else if (args_marshal[i] == 'j' || args_marshal[i] == 'k') {
              var enumVal = this.js_to_mono_enum(method, i, args[i])
              var extra_cell = extra_args_mem + extra_arg_idx
              extra_arg_idx += 8
              if (args_marshal[i] == 'j') Module.setValue(extra_cell, enumVal, 'i32')
              else if (args_marshal[i] == 'k') Module.setValue(extra_cell, enumVal, 'i64')
              Module.setValue(args_mem + i * 4, extra_cell, 'i32')
            } else if (
              args_marshal[i] == 'i' ||
              args_marshal[i] == 'f' ||
              args_marshal[i] == 'l' ||
              args_marshal[i] == 'd'
            ) {
              var extra_cell = extra_args_mem + extra_arg_idx
              extra_arg_idx += 8
              if (args_marshal[i] == 'i') Module.setValue(extra_cell, args[i], 'i32')
              else if (args_marshal[i] == 'l') Module.setValue(extra_cell, args[i], 'i64')
              else if (args_marshal[i] == 'f') Module.setValue(extra_cell, args[i], 'float')
              else Module.setValue(extra_cell, args[i], 'double')
              Module.setValue(args_mem + i * 4, extra_cell, 'i32')
            }
          }
        }
        Module.setValue(out_exc, 0, 'i32')
        var res = this.invoke_method(method, this_arg, args_mem, out_exc)
        var eh_res = Module.getValue(out_exc, 'i32')
        if (extra_args_mem) Module._free(extra_args_mem)
        if (args_mem) Module._free(args_mem)
        Module._free(out_exc)
        if (eh_res != 0) {
          var msg = this.conv_string(res)
          throw new Error(msg)
        }
        if (has_args_marshal && has_args) {
          if (args_marshal.length >= args.length && args_marshal[args.length] === 'm') return res
        }
        return this.unbox_mono_obj(res)
      },
      invoke_delegate: function (delegate_obj, js_args) {
        this.bindings_lazy_init()
        if (!this.delegate_dynamic_invoke) {
          if (!this.corlib) this.corlib = this.assembly_load('mscorlib')
          if (!this.delegate_class)
            this.delegate_class = this.find_class(this.corlib, 'System', 'Delegate')
          if (!this.delegate_class) {
            throw new Error('System.Delegate class can not be resolved.')
          }
          this.delegate_dynamic_invoke = this.find_method(this.delegate_class, 'DynamicInvoke', -1)
        }
        var mono_args = this.js_array_to_mono_array(js_args)
        if (!this.delegate_dynamic_invoke)
          throw new Error('System.Delegate.DynamicInvoke method can not be resolved.')
        return this.call_method(
          this.delegate_dynamic_invoke,
          this.extract_mono_obj(delegate_obj),
          'mo',
          [mono_args]
        )
      },
      resolve_method_fqn: function (fqn) {
        var assembly = fqn.substring(fqn.indexOf('[') + 1, fqn.indexOf(']')).trim()
        fqn = fqn.substring(fqn.indexOf(']') + 1).trim()
        var methodname = fqn.substring(fqn.indexOf(':') + 1)
        fqn = fqn.substring(0, fqn.indexOf(':')).trim()
        var namespace = ''
        var classname = fqn
        if (fqn.indexOf('.') != -1) {
          var idx = fqn.lastIndexOf('.')
          namespace = fqn.substring(0, idx)
          classname = fqn.substring(idx + 1)
        }
        var asm = this.assembly_load(assembly)
        if (!asm) throw new Error('Could not find assembly: ' + assembly)
        var klass = this.find_class(asm, namespace, classname)
        if (!klass) throw new Error('Could not find class: ' + namespace + ':' + classname)
        var method = this.find_method(klass, methodname, -1)
        if (!method) throw new Error('Could not find method: ' + methodname)
        return method
      },
      call_static_method: function (fqn, args, signature) {
        this.bindings_lazy_init()
        var method = this.resolve_method_fqn(fqn)
        if (typeof signature === 'undefined')
          signature = Module.mono_method_get_call_signature(method)
        return this.call_method(method, null, signature, args)
      },
      bind_static_method: function (fqn, signature) {
        this.bindings_lazy_init()
        var method = this.resolve_method_fqn(fqn)
        if (typeof signature === 'undefined')
          signature = Module.mono_method_get_call_signature(method)
        return function () {
          return BINDING.call_method(method, null, signature, arguments)
        }
      },
      bind_assembly_entry_point: function (assembly) {
        this.bindings_lazy_init()
        var asm = this.assembly_load(assembly)
        if (!asm) throw new Error('Could not find assembly: ' + assembly)
        var method = this.assembly_get_entry_point(asm)
        if (!method) throw new Error('Could not find entry point for assembly: ' + assembly)
        if (typeof signature === 'undefined')
          signature = Module.mono_method_get_call_signature(method)
        return function () {
          return BINDING.call_method(method, null, signature, arguments)
        }
      },
      call_assembly_entry_point: function (assembly, args, signature) {
        this.bindings_lazy_init()
        var asm = this.assembly_load(assembly)
        if (!asm) throw new Error('Could not find assembly: ' + assembly)
        var method = this.assembly_get_entry_point(asm)
        if (!method) throw new Error('Could not find entry point for assembly: ' + assembly)
        if (typeof signature === 'undefined')
          signature = Module.mono_method_get_call_signature(method)
        return this.call_method(method, null, signature, args)
      },
      wasm_get_core_type: function (obj) {
        return this.call_method(this.get_core_type, null, 'so', [
          'WebAssembly.Core.' + obj.constructor.name
        ])
      },
      get_wasm_type: function (obj) {
        var coreType = obj[Symbol.for('wasm type')]
        if (typeof coreType === 'undefined') {
          switch (obj.constructor.name) {
            case 'Array':
              coreType = this.wasm_get_core_type(obj)
              if (typeof coreType !== 'undefined') {
                Array.prototype[Symbol.for('wasm type')] = coreType
              }
              break
            case 'ArrayBuffer':
              coreType = this.wasm_get_core_type(obj)
              if (typeof coreType !== 'undefined') {
                ArrayBuffer.prototype[Symbol.for('wasm type')] = coreType
              }
              break
            case 'Int8Array':
              coreType = this.wasm_get_core_type(obj)
              if (typeof coreType !== 'undefined') {
                Int8Array.prototype[Symbol.for('wasm type')] = coreType
              }
              break
            case 'Uint8Array':
              coreType = this.wasm_get_core_type(obj)
              if (typeof coreType !== 'undefined') {
                Uint8Array.prototype[Symbol.for('wasm type')] = coreType
              }
              break
            case 'Uint8ClampedArray':
              coreType = this.wasm_get_core_type(obj)
              if (typeof coreType !== 'undefined') {
                Uint8ClampedArray.prototype[Symbol.for('wasm type')] = coreType
              }
              break
            case 'Int16Array':
              coreType = this.wasm_get_core_type(obj)
              if (typeof coreType !== 'undefined') {
                Int16Array.prototype[Symbol.for('wasm type')] = coreType
              }
              break
            case 'Uint16Array':
              coreType = this.wasm_get_core_type(obj)
              if (typeof coreType !== 'undefined') {
                Uint16Array.prototype[Symbol.for('wasm type')] = coreType
              }
              break
            case 'Int32Array':
              coreType = this.wasm_get_core_type(obj)
              if (typeof coreType !== 'undefined') {
                Int32Array.prototype[Symbol.for('wasm type')] = coreType
              }
              break
            case 'Uint32Array':
              coreType = this.wasm_get_core_type(obj)
              if (typeof coreType !== 'undefined') {
                Uint32Array.prototype[Symbol.for('wasm type')] = coreType
              }
              return coreType
            case 'Float32Array':
              coreType = this.wasm_get_core_type(obj)
              if (typeof coreType !== 'undefined') {
                Float32Array.prototype[Symbol.for('wasm type')] = coreType
              }
              break
            case 'Float64Array':
              coreType = this.wasm_get_core_type(obj)
              if (typeof coreType !== 'undefined') {
                Float64Array.prototype[Symbol.for('wasm type')] = coreType
              }
              break
            case 'Function':
              coreType = this.wasm_get_core_type(obj)
              if (typeof coreType !== 'undefined') {
                Function.prototype[Symbol.for('wasm type')] = coreType
              }
              break
            case 'SharedArrayBuffer':
              coreType = this.wasm_get_core_type(obj)
              if (typeof coreType !== 'undefined') {
                SharedArrayBuffer.prototype[Symbol.for('wasm type')] = coreType
              }
              break
            case 'DataView':
              coreType = this.wasm_get_core_type(obj)
              if (typeof coreType !== 'undefined') {
                DataView.prototype[Symbol.for('wasm type')] = coreType
              }
              break
          }
        }
        return coreType
      },
      mono_wasm_register_obj: function (obj) {
        var gc_handle = undefined
        if (obj !== null && typeof obj !== 'undefined') {
          gc_handle = obj.__mono_gchandle__
          if (typeof gc_handle === 'undefined') {
            var handle = this.mono_wasm_free_list.length
              ? this.mono_wasm_free_list.pop()
              : this.mono_wasm_ref_counter++
            obj.__mono_jshandle__ = handle
            var wasm_type = this.get_wasm_type(obj)
            gc_handle = obj.__mono_gchandle__ = this.wasm_binding_obj_new(handle + 1, wasm_type)
            this.mono_wasm_object_registry[handle] = obj
          }
        }
        return gc_handle
      },
      mono_wasm_require_handle: function (handle) {
        if (handle > 0) return this.mono_wasm_object_registry[handle - 1]
        return null
      },
      mono_wasm_unregister_obj: function (js_id) {
        var obj = this.mono_wasm_object_registry[js_id - 1]
        if (typeof obj !== 'undefined' && obj !== null) {
          if (typeof ___mono_wasm_global___ !== 'undefined' && ___mono_wasm_global___ === obj)
            return obj
          var gc_handle = obj.__mono_gchandle__
          if (typeof gc_handle !== 'undefined') {
            this.wasm_unbind_js_obj_and_free(js_id)
            obj.__mono_gchandle__ = undefined
            obj.__mono_jshandle__ = undefined
            this.mono_wasm_object_registry[js_id - 1] = undefined
            this.mono_wasm_free_list.push(js_id - 1)
          }
        }
        return obj
      },
      mono_wasm_free_handle: function (handle) {
        this.mono_wasm_unregister_obj(handle)
      },
      mono_wasm_free_raw_object: function (js_id) {
        var obj = this.mono_wasm_object_registry[js_id - 1]
        if (typeof obj !== 'undefined' && obj !== null) {
          if (typeof ___mono_wasm_global___ !== 'undefined' && ___mono_wasm_global___ === obj)
            return obj
          var gc_handle = obj.__mono_gchandle__
          if (typeof gc_handle !== 'undefined') {
            obj.__mono_gchandle__ = undefined
            obj.__mono_jshandle__ = undefined
            this.mono_wasm_object_registry[js_id - 1] = undefined
            this.mono_wasm_free_list.push(js_id - 1)
          }
        }
        return obj
      },
      mono_wasm_get_global: function () {
        function testGlobal(obj) {
          obj['___mono_wasm_global___'] = obj
          var success =
            typeof ___mono_wasm_global___ === 'object' && obj['___mono_wasm_global___'] === obj
          if (!success) {
            delete obj['___mono_wasm_global___']
          }
          return success
        }
        if (typeof ___mono_wasm_global___ === 'object') {
          return ___mono_wasm_global___
        }
        if (typeof global === 'object' && testGlobal(global)) {
          ___mono_wasm_global___ = global
        } else if (typeof window === 'object' && testGlobal(window)) {
          ___mono_wasm_global___ = window
        } else if (
          testGlobal(
            (function () {
              return Function
            })()('return this')()
          )
        ) {
          ___mono_wasm_global___ = (function () {
            return Function
          })()('return this')()
        }
        if (typeof ___mono_wasm_global___ === 'object') {
          return ___mono_wasm_global___
        }
        throw Error('Unable to get mono wasm global object.')
      }
    }
    function _mono_wasm_bind_core_object(js_handle, gc_handle, is_exception) {
      BINDING.bindings_lazy_init()
      var requireObject = BINDING.mono_wasm_require_handle(js_handle)
      if (!requireObject) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string("Invalid JS object handle '" + js_handle + "'")
      }
      BINDING.wasm_bind_core_clr_obj(js_handle, gc_handle)
      requireObject.__mono_gchandle__ = gc_handle
      return gc_handle
    }
    function _mono_wasm_bind_host_object(js_handle, gc_handle, is_exception) {
      BINDING.bindings_lazy_init()
      var requireObject = BINDING.mono_wasm_require_handle(js_handle)
      if (!requireObject) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string("Invalid JS object handle '" + js_handle + "'")
      }
      BINDING.wasm_bind_core_clr_obj(js_handle, gc_handle)
      requireObject.__mono_gchandle__ = gc_handle
      return gc_handle
    }
    function _mono_wasm_fire_bp() {
      console.log('mono_wasm_fire_bp')
      debugger
    }
    function _mono_wasm_get_by_index(js_handle, property_index, is_exception) {
      BINDING.bindings_lazy_init()
      var obj = BINDING.mono_wasm_require_handle(js_handle)
      if (!obj) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string("Invalid JS object handle '" + js_handle + "'")
      }
      try {
        var m = obj[property_index]
        return BINDING.js_to_mono_obj(m)
      } catch (e) {
        var res = e.toString()
        setValue(is_exception, 1, 'i32')
        if (res === null || typeof res === 'undefined') res = 'unknown exception'
        return BINDING.js_string_to_mono_string(res)
      }
    }
    function _mono_wasm_get_global_object(global_name, is_exception) {
      BINDING.bindings_lazy_init()
      var js_name = BINDING.conv_string(global_name)
      var globalObj = undefined
      if (!js_name) {
        globalObj = BINDING.mono_wasm_get_global()
      } else {
        globalObj = BINDING.mono_wasm_get_global()[js_name]
      }
      if (globalObj === null || typeof globalObj === undefined) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string("Global object '" + js_name + "' not found.")
      }
      return BINDING.js_to_mono_obj(globalObj)
    }
    function _mono_wasm_get_object_property(js_handle, property_name, is_exception) {
      BINDING.bindings_lazy_init()
      var obj = BINDING.mono_wasm_require_handle(js_handle)
      if (!obj) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string("Invalid JS object handle '" + js_handle + "'")
      }
      var js_name = BINDING.conv_string(property_name)
      if (!js_name) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string("Invalid property name object '" + js_name + "'")
      }
      var res
      try {
        var m = obj[js_name]
        if (m === Object(m) && obj.__is_mono_proxied__) m.__is_mono_proxied__ = true
        return BINDING.js_to_mono_obj(m)
      } catch (e) {
        var res = e.toString()
        setValue(is_exception, 1, 'i32')
        if (res === null || typeof res === 'undefined') res = 'unknown exception'
        return BINDING.js_string_to_mono_string(res)
      }
    }
    var DOTNET = {
      _dotnet_get_global: function () {
        function testGlobal(obj) {
          obj['___dotnet_global___'] = obj
          var success =
            typeof ___dotnet_global___ === 'object' && obj['___dotnet_global___'] === obj
          if (!success) {
            delete obj['___dotnet_global___']
          }
          return success
        }
        if (typeof ___dotnet_global___ === 'object') {
          return ___dotnet_global___
        }
        if (typeof global === 'object' && testGlobal(global)) {
          ___dotnet_global___ = global
        } else if (typeof window === 'object' && testGlobal(window)) {
          ___dotnet_global___ = window
        }
        if (typeof ___dotnet_global___ === 'object') {
          return ___dotnet_global___
        }
        throw Error('unable to get DotNet global object.')
      },
      conv_string: function (mono_obj) {
        if (mono_obj == 0) return null
        if (!this.mono_string_get_utf8)
          this.mono_string_get_utf8 = Module.cwrap('mono_wasm_string_get_utf8', 'number', [
            'number'
          ])
        var raw = this.mono_string_get_utf8(mono_obj)
        var res = Module.UTF8ToString(raw)
        Module._free(raw)
        return res
      }
    }
    function _mono_wasm_invoke_js_marshalled(
      exceptionMessage,
      asyncHandleLongPtr,
      functionName,
      argsJson
    ) {
      var mono_string =
        DOTNET._dotnet_get_global()._mono_string_cached ||
        (DOTNET._dotnet_get_global()._mono_string_cached = Module.cwrap(
          'mono_wasm_string_from_js',
          'number',
          ['string']
        ))
      try {
        var u32Index = asyncHandleLongPtr >> 2
        var asyncHandleJsNumber =
          Module.HEAPU32[u32Index + 1] * 4294967296 + Module.HEAPU32[u32Index]
        var funcNameJsString = DOTNET.conv_string(functionName)
        var argsJsonJsString = argsJson && DOTNET.conv_string(argsJson)
        var dotNetExports = DOTNET._dotnet_get_global().DotNet
        if (!dotNetExports) {
          throw new Error('The Microsoft.JSInterop.js library is not loaded.')
        }
        if (asyncHandleJsNumber) {
          dotNetExports.jsCallDispatcher.beginInvokeJSFromDotNet(
            asyncHandleJsNumber,
            funcNameJsString,
            argsJsonJsString
          )
          return 0
        } else {
          var resultJson = dotNetExports.jsCallDispatcher.invokeJSFromDotNet(
            funcNameJsString,
            argsJsonJsString
          )
          return resultJson === null ? 0 : mono_string(resultJson)
        }
      } catch (ex) {
        var exceptionJsString = ex.message + '\n' + ex.stack
        var exceptionSystemString = mono_string(exceptionJsString)
        setValue(exceptionMessage, exceptionSystemString, 'i32')
        return 0
      }
    }
    function _mono_wasm_invoke_js_unmarshalled(exceptionMessage, funcName, arg0, arg1, arg2) {
      try {
        var funcNameJsString = DOTNET.conv_string(funcName)
        var dotNetExports = DOTNET._dotnet_get_global().DotNet
        if (!dotNetExports) {
          throw new Error('The Microsoft.JSInterop.js library is not loaded.')
        }
        var funcInstance = dotNetExports.jsCallDispatcher.findJSFunction(funcNameJsString)
        return funcInstance.call(null, arg0, arg1, arg2)
      } catch (ex) {
        var exceptionJsString = ex.message + '\n' + ex.stack
        var mono_string = Module.cwrap('mono_wasm_string_from_js', 'number', ['string'])
        var exceptionSystemString = mono_string(exceptionJsString)
        setValue(exceptionMessage, exceptionSystemString, 'i32')
        return 0
      }
    }
    function _mono_wasm_invoke_js_with_args(js_handle, method_name, args, is_exception) {
      BINDING.bindings_lazy_init()
      var obj = BINDING.get_js_obj(js_handle)
      if (!obj) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string("Invalid JS object handle '" + js_handle + "'")
      }
      var js_name = BINDING.conv_string(method_name)
      if (!js_name) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string("Invalid method name object '" + method_name + "'")
      }
      var js_args = BINDING.mono_array_to_js_array(args)
      var res
      try {
        var m = obj[js_name]
        if (typeof m === 'undefined')
          throw new Error(
            "Method: '" + js_name + "' not found for: '" + Object.prototype.toString.call(obj) + "'"
          )
        var res = m.apply(obj, js_args)
        return BINDING.js_to_mono_obj(res)
      } catch (e) {
        var res = e.toString()
        setValue(is_exception, 1, 'i32')
        if (res === null || res === undefined) res = 'unknown exception'
        return BINDING.js_string_to_mono_string(res)
      }
    }
    function _mono_wasm_new(core_name, args, is_exception) {
      BINDING.bindings_lazy_init()
      var js_name = BINDING.conv_string(core_name)
      if (!js_name) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string("Core object '" + js_name + "' not found.")
      }
      var coreObj = BINDING.mono_wasm_get_global()[js_name]
      if (coreObj === null || typeof coreObj === 'undefined') {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string(
          "JavaScript host object '" + js_name + "' not found."
        )
      }
      var js_args = BINDING.mono_array_to_js_array(args)
      try {
        var allocator = function (constructor, js_args) {
          var argsList = new Array()
          argsList[0] = constructor
          if (js_args) argsList = argsList.concat(js_args)
          var obj = new (constructor.bind.apply(constructor, argsList))()
          return obj
        }
        var res = allocator(coreObj, js_args)
        var gc_handle = BINDING.mono_wasm_free_list.length
          ? BINDING.mono_wasm_free_list.pop()
          : BINDING.mono_wasm_ref_counter++
        BINDING.mono_wasm_object_registry[gc_handle] = res
        return BINDING.js_to_mono_obj(gc_handle + 1)
      } catch (e) {
        var res = e.toString()
        setValue(is_exception, 1, 'i32')
        if (res === null || res === undefined) res = 'Error allocating object.'
        return BINDING.js_string_to_mono_string(res)
      }
    }
    function _mono_wasm_new_object(object_handle_or_function, args, is_exception) {
      BINDING.bindings_lazy_init()
      if (!object_handle_or_function) {
        return BINDING.js_to_mono_obj({})
      } else {
        var requireObject
        if (typeof object_handle_or_function === 'function')
          requireObject = object_handle_or_function
        else requireObject = BINDING.mono_wasm_require_handle(object_handle_or_function)
        if (!requireObject) {
          setValue(is_exception, 1, 'i32')
          return BINDING.js_string_to_mono_string(
            "Invalid JS object handle '" + object_handle_or_function + "'"
          )
        }
        var js_args = BINDING.mono_array_to_js_array(args)
        try {
          var allocator = function (constructor, js_args) {
            var argsList = new Array()
            argsList[0] = constructor
            if (js_args) argsList = argsList.concat(js_args)
            var obj = new (constructor.bind.apply(constructor, argsList))()
            return obj
          }
          var res = allocator(requireObject, js_args)
          return BINDING.extract_mono_obj(res)
        } catch (e) {
          var res = e.toString()
          setValue(is_exception, 1, 'i32')
          if (res === null || res === undefined) res = 'Error allocating object.'
          return BINDING.js_string_to_mono_string(res)
        }
      }
    }
    function _mono_wasm_release_handle(js_handle, is_exception) {
      BINDING.bindings_lazy_init()
      BINDING.mono_wasm_free_handle(js_handle)
    }
    function _mono_wasm_release_object(js_handle, is_exception) {
      BINDING.bindings_lazy_init()
      BINDING.mono_wasm_free_raw_object(js_handle)
    }
    function _mono_wasm_set_by_index(js_handle, property_index, value, is_exception) {
      BINDING.bindings_lazy_init()
      var obj = BINDING.mono_wasm_require_handle(js_handle)
      if (!obj) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string("Invalid JS object handle '" + js_handle + "'")
      }
      var js_value = BINDING.unbox_mono_obj(value)
      try {
        obj[property_index] = js_value
        return true
      } catch (e) {
        var res = e.toString()
        setValue(is_exception, 1, 'i32')
        if (res === null || typeof res === 'undefined') res = 'unknown exception'
        return BINDING.js_string_to_mono_string(res)
      }
    }
    function _mono_wasm_set_object_property(
      js_handle,
      property_name,
      value,
      createIfNotExist,
      hasOwnProperty,
      is_exception
    ) {
      BINDING.bindings_lazy_init()
      var requireObject = BINDING.mono_wasm_require_handle(js_handle)
      if (!requireObject) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string("Invalid JS object handle '" + js_handle + "'")
      }
      var property = BINDING.conv_string(property_name)
      if (!property) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string(
          "Invalid property name object '" + property_name + "'"
        )
      }
      var result = false
      var js_value = BINDING.unbox_mono_obj(value)
      if (createIfNotExist) {
        requireObject[property] = js_value
        result = true
      } else {
        result = false
        if (!createIfNotExist) {
          if (!requireObject.hasOwnProperty(property)) return false
        }
        if (hasOwnProperty === true) {
          if (requireObject.hasOwnProperty(property)) {
            requireObject[property] = js_value
            result = true
          }
        } else {
          requireObject[property] = js_value
          result = true
        }
      }
      return BINDING.call_method(BINDING.box_js_bool, null, 'im', [result])
    }
    function _mono_wasm_typed_array_copy_from(
      js_handle,
      pinned_array,
      begin,
      end,
      bytes_per_element,
      is_exception
    ) {
      BINDING.bindings_lazy_init()
      var requireObject = BINDING.mono_wasm_require_handle(js_handle)
      if (!requireObject) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string("Invalid JS object handle '" + js_handle + "'")
      }
      var res = BINDING.typedarray_copy_from(
        requireObject,
        pinned_array,
        begin,
        end,
        bytes_per_element
      )
      return BINDING.js_to_mono_obj(res)
    }
    function _mono_wasm_typed_array_copy_to(
      js_handle,
      pinned_array,
      begin,
      end,
      bytes_per_element,
      is_exception
    ) {
      BINDING.bindings_lazy_init()
      var requireObject = BINDING.mono_wasm_require_handle(js_handle)
      if (!requireObject) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string("Invalid JS object handle '" + js_handle + "'")
      }
      var res = BINDING.typedarray_copy_to(
        requireObject,
        pinned_array,
        begin,
        end,
        bytes_per_element
      )
      return BINDING.js_to_mono_obj(res)
    }
    function _mono_wasm_typed_array_from(
      pinned_array,
      begin,
      end,
      bytes_per_element,
      type,
      is_exception
    ) {
      BINDING.bindings_lazy_init()
      var res = BINDING.typed_array_from(pinned_array, begin, end, bytes_per_element, type)
      return BINDING.js_to_mono_obj(res)
    }
    function _mono_wasm_typed_array_to_array(js_handle, is_exception) {
      BINDING.bindings_lazy_init()
      var requireObject = BINDING.mono_wasm_require_handle(js_handle)
      if (!requireObject) {
        setValue(is_exception, 1, 'i32')
        return BINDING.js_string_to_mono_string("Invalid JS object handle '" + js_handle + "'")
      }
      return BINDING.js_typed_array_to_array(requireObject)
    }
    function _usleep(useconds) {
      var start = _emscripten_get_now()
      while (_emscripten_get_now() - start < useconds / 1e3) {}
    }
    Module['_usleep'] = _usleep
    function _nanosleep(rqtp, rmtp) {
      if (rqtp === 0) {
        ___setErrNo(28)
        return -1
      }
      var seconds = HEAP32[rqtp >> 2]
      var nanoseconds = HEAP32[(rqtp + 4) >> 2]
      if (nanoseconds < 0 || nanoseconds > 999999999 || seconds < 0) {
        ___setErrNo(28)
        return -1
      }
      if (rmtp !== 0) {
        HEAP32[rmtp >> 2] = 0
        HEAP32[(rmtp + 4) >> 2] = 0
      }
      return _usleep(seconds * 1e6 + nanoseconds / 1e3)
    }
    function _pthread_cleanup_pop() {
      assert(
        _pthread_cleanup_push.level == __ATEXIT__.length,
        'cannot pop if something else added meanwhile!'
      )
      __ATEXIT__.pop()
      _pthread_cleanup_push.level = __ATEXIT__.length
    }
    function _pthread_cleanup_push(routine, arg) {
      __ATEXIT__.push(function () {
        dynCall_vi(routine, arg)
      })
      _pthread_cleanup_push.level = __ATEXIT__.length
    }
    function _pthread_mutexattr_destroy() {}
    function _pthread_mutexattr_init() {}
    function _pthread_mutexattr_setprotocol() {}
    function _pthread_mutexattr_settype() {}
    function _pthread_setcancelstate() {
      return 0
    }
    function _round(d) {
      d = +d
      return d >= +0 ? +Math_floor(d + +0.5) : +Math_ceil(d - +0.5)
    }
    function _roundf(d) {
      d = +d
      return d >= +0 ? +Math_floor(d + +0.5) : +Math_ceil(d - +0.5)
    }
    function _schedule_background_exec() {
      ++MONO.pump_count
      if (ENVIRONMENT_IS_WEB) {
        window.setTimeout(MONO.pump_message, 0)
      } else if (ENVIRONMENT_IS_WORKER) {
        self.setTimeout(MONO.pump_message, 0)
      } else if (ENVIRONMENT_IS_NODE) {
        global.setTimeout(MONO.pump_message, 0)
      }
    }
    function _sem_destroy() {}
    function _sem_init() {}
    function _sem_post() {}
    function _sem_trywait() {}
    function _sem_wait() {}
    function _setTempRet0($i) {
      setTempRet0($i | 0)
    }
    function _sigaction(signum, act, oldact) {
      return 0
    }
    function _sigemptyset(set) {
      HEAP32[set >> 2] = 0
      return 0
    }
    function __isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
    }
    function __arraySum(array, index) {
      var sum = 0
      for (var i = 0; i <= index; sum += array[i++]) {}
      return sum
    }
    var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    function __addDays(date, days) {
      var newDate = new Date(date.getTime())
      while (days > 0) {
        var leap = __isLeapYear(newDate.getFullYear())
        var currentMonth = newDate.getMonth()
        var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth]
        if (days > daysInCurrentMonth - newDate.getDate()) {
          days -= daysInCurrentMonth - newDate.getDate() + 1
          newDate.setDate(1)
          if (currentMonth < 11) {
            newDate.setMonth(currentMonth + 1)
          } else {
            newDate.setMonth(0)
            newDate.setFullYear(newDate.getFullYear() + 1)
          }
        } else {
          newDate.setDate(newDate.getDate() + days)
          return newDate
        }
      }
      return newDate
    }
    function _strftime(s, maxsize, format, tm) {
      var tm_zone = HEAP32[(tm + 40) >> 2]
      var date = {
        tm_sec: HEAP32[tm >> 2],
        tm_min: HEAP32[(tm + 4) >> 2],
        tm_hour: HEAP32[(tm + 8) >> 2],
        tm_mday: HEAP32[(tm + 12) >> 2],
        tm_mon: HEAP32[(tm + 16) >> 2],
        tm_year: HEAP32[(tm + 20) >> 2],
        tm_wday: HEAP32[(tm + 24) >> 2],
        tm_yday: HEAP32[(tm + 28) >> 2],
        tm_isdst: HEAP32[(tm + 32) >> 2],
        tm_gmtoff: HEAP32[(tm + 36) >> 2],
        tm_zone: tm_zone ? UTF8ToString(tm_zone) : ''
      }
      var pattern = UTF8ToString(format)
      var EXPANSION_RULES_1 = {
        '%c': '%a %b %d %H:%M:%S %Y',
        '%D': '%m/%d/%y',
        '%F': '%Y-%m-%d',
        '%h': '%b',
        '%r': '%I:%M:%S %p',
        '%R': '%H:%M',
        '%T': '%H:%M:%S',
        '%x': '%m/%d/%y',
        '%X': '%H:%M:%S',
        '%Ec': '%c',
        '%EC': '%C',
        '%Ex': '%m/%d/%y',
        '%EX': '%H:%M:%S',
        '%Ey': '%y',
        '%EY': '%Y',
        '%Od': '%d',
        '%Oe': '%e',
        '%OH': '%H',
        '%OI': '%I',
        '%Om': '%m',
        '%OM': '%M',
        '%OS': '%S',
        '%Ou': '%u',
        '%OU': '%U',
        '%OV': '%V',
        '%Ow': '%w',
        '%OW': '%W',
        '%Oy': '%y'
      }
      for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule])
      }
      var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      var MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      function leadingSomething(value, digits, character) {
        var str = typeof value === 'number' ? value.toString() : value || ''
        while (str.length < digits) {
          str = character[0] + str
        }
        return str
      }
      function leadingNulls(value, digits) {
        return leadingSomething(value, digits, '0')
      }
      function compareByDay(date1, date2) {
        function sgn(value) {
          return value < 0 ? -1 : value > 0 ? 1 : 0
        }
        var compare
        if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
          if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
            compare = sgn(date1.getDate() - date2.getDate())
          }
        }
        return compare
      }
      function getFirstWeekStartDate(janFourth) {
        switch (janFourth.getDay()) {
          case 0:
            return new Date(janFourth.getFullYear() - 1, 11, 29)
          case 1:
            return janFourth
          case 2:
            return new Date(janFourth.getFullYear(), 0, 3)
          case 3:
            return new Date(janFourth.getFullYear(), 0, 2)
          case 4:
            return new Date(janFourth.getFullYear(), 0, 1)
          case 5:
            return new Date(janFourth.getFullYear() - 1, 11, 31)
          case 6:
            return new Date(janFourth.getFullYear() - 1, 11, 30)
        }
      }
      function getWeekBasedYear(date) {
        var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday)
        var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4)
        var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4)
        var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear)
        var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear)
        if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
          if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
            return thisDate.getFullYear() + 1
          } else {
            return thisDate.getFullYear()
          }
        } else {
          return thisDate.getFullYear() - 1
        }
      }
      var EXPANSION_RULES_2 = {
        '%a': function (date) {
          return WEEKDAYS[date.tm_wday].substring(0, 3)
        },
        '%A': function (date) {
          return WEEKDAYS[date.tm_wday]
        },
        '%b': function (date) {
          return MONTHS[date.tm_mon].substring(0, 3)
        },
        '%B': function (date) {
          return MONTHS[date.tm_mon]
        },
        '%C': function (date) {
          var year = date.tm_year + 1900
          return leadingNulls((year / 100) | 0, 2)
        },
        '%d': function (date) {
          return leadingNulls(date.tm_mday, 2)
        },
        '%e': function (date) {
          return leadingSomething(date.tm_mday, 2, ' ')
        },
        '%g': function (date) {
          return getWeekBasedYear(date).toString().substring(2)
        },
        '%G': function (date) {
          return getWeekBasedYear(date)
        },
        '%H': function (date) {
          return leadingNulls(date.tm_hour, 2)
        },
        '%I': function (date) {
          var twelveHour = date.tm_hour
          if (twelveHour == 0) twelveHour = 12
          else if (twelveHour > 12) twelveHour -= 12
          return leadingNulls(twelveHour, 2)
        },
        '%j': function (date) {
          return leadingNulls(
            date.tm_mday +
              __arraySum(
                __isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR,
                date.tm_mon - 1
              ),
            3
          )
        },
        '%m': function (date) {
          return leadingNulls(date.tm_mon + 1, 2)
        },
        '%M': function (date) {
          return leadingNulls(date.tm_min, 2)
        },
        '%n': function () {
          return '\n'
        },
        '%p': function (date) {
          if (date.tm_hour >= 0 && date.tm_hour < 12) {
            return 'AM'
          } else {
            return 'PM'
          }
        },
        '%S': function (date) {
          return leadingNulls(date.tm_sec, 2)
        },
        '%t': function () {
          return '\t'
        },
        '%u': function (date) {
          return date.tm_wday || 7
        },
        '%U': function (date) {
          var janFirst = new Date(date.tm_year + 1900, 0, 1)
          var firstSunday =
            janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7 - janFirst.getDay())
          var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday)
          if (compareByDay(firstSunday, endDate) < 0) {
            var februaryFirstUntilEndMonth =
              __arraySum(
                __isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR,
                endDate.getMonth() - 1
              ) - 31
            var firstSundayUntilEndJanuary = 31 - firstSunday.getDate()
            var days = firstSundayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate()
            return leadingNulls(Math.ceil(days / 7), 2)
          }
          return compareByDay(firstSunday, janFirst) === 0 ? '01' : '00'
        },
        '%V': function (date) {
          var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4)
          var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4)
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear)
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear)
          var endDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday)
          if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
            return '53'
          }
          if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
            return '01'
          }
          var daysDifference
          if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) {
            daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate()
          } else {
            daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate()
          }
          return leadingNulls(Math.ceil(daysDifference / 7), 2)
        },
        '%w': function (date) {
          return date.tm_wday
        },
        '%W': function (date) {
          var janFirst = new Date(date.tm_year, 0, 1)
          var firstMonday =
            janFirst.getDay() === 1
              ? janFirst
              : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1)
          var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday)
          if (compareByDay(firstMonday, endDate) < 0) {
            var februaryFirstUntilEndMonth =
              __arraySum(
                __isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR,
                endDate.getMonth() - 1
              ) - 31
            var firstMondayUntilEndJanuary = 31 - firstMonday.getDate()
            var days = firstMondayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate()
            return leadingNulls(Math.ceil(days / 7), 2)
          }
          return compareByDay(firstMonday, janFirst) === 0 ? '01' : '00'
        },
        '%y': function (date) {
          return (date.tm_year + 1900).toString().substring(2)
        },
        '%Y': function (date) {
          return date.tm_year + 1900
        },
        '%z': function (date) {
          var off = date.tm_gmtoff
          var ahead = off >= 0
          off = Math.abs(off) / 60
          off = (off / 60) * 100 + (off % 60)
          return (ahead ? '+' : '-') + String('0000' + off).slice(-4)
        },
        '%Z': function (date) {
          return date.tm_zone
        },
        '%%': function () {
          return '%'
        }
      }
      for (var rule in EXPANSION_RULES_2) {
        if (pattern.indexOf(rule) >= 0) {
          pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_2[rule](date))
        }
      }
      var bytes = intArrayFromString(pattern, false)
      if (bytes.length > maxsize) {
        return 0
      }
      writeArrayToMemory(bytes, s)
      return bytes.length - 1
    }
    function _strftime_l(s, maxsize, format, tm) {
      return _strftime(s, maxsize, format, tm)
    }
    function _sysconf(name) {
      switch (name) {
        case 30:
          return 16384
        case 85:
          var maxHeapSize = 2 * 1024 * 1024 * 1024 - 65536
          return maxHeapSize / 16384
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
        case 79:
          return 200809
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024
        case 31:
        case 42:
        case 72:
          return 32
        case 87:
        case 26:
        case 33:
          return 2147483647
        case 34:
        case 1:
          return 47839
        case 38:
        case 36:
          return 99
        case 43:
        case 37:
          return 2048
        case 0:
          return 2097152
        case 3:
          return 65536
        case 28:
          return 32768
        case 44:
          return 32767
        case 75:
          return 16384
        case 39:
          return 1e3
        case 89:
          return 700
        case 71:
          return 256
        case 40:
          return 255
        case 2:
          return 100
        case 180:
          return 64
        case 25:
          return 20
        case 5:
          return 16
        case 6:
          return 6
        case 73:
          return 4
        case 84: {
          if (typeof navigator === 'object') return navigator['hardwareConcurrency'] || 1
          return 1
        }
      }
      ___setErrNo(28)
      return -1
    }
    function _time(ptr) {
      var ret = (Date.now() / 1e3) | 0
      if (ptr) {
        HEAP32[ptr >> 2] = ret
      }
      return ret
    }
    function _utime(path, times) {
      var time
      if (times) {
        var offset = 4
        time = HEAP32[(times + offset) >> 2]
        time *= 1e3
      } else {
        time = Date.now()
      }
      path = UTF8ToString(path)
      try {
        FS.utime(path, time, time)
        return 0
      } catch (e) {
        FS.handleFSError(e)
        return -1
      }
    }
    function _utimes(path, times) {
      var time
      if (times) {
        var offset = 8 + 0
        time = HEAP32[(times + offset) >> 2] * 1e3
        offset = 8 + 4
        time += HEAP32[(times + offset) >> 2] / 1e3
      } else {
        time = Date.now()
      }
      path = UTF8ToString(path)
      try {
        FS.utime(path, time, time)
        return 0
      } catch (e) {
        FS.handleFSError(e)
        return -1
      }
    }
    function _wait(stat_loc) {
      ___setErrNo(12)
      return -1
    }
    function _waitpid(a0) {
      return _wait(a0)
    }
    function readAsmConstArgs(sigPtr, buf) {
      if (!readAsmConstArgs.array) {
        readAsmConstArgs.array = []
      }
      var args = readAsmConstArgs.array
      args.length = 0
      var ch
      while ((ch = HEAPU8[sigPtr++])) {
        if (ch === 100 || ch === 102) {
          buf = (buf + 7) & ~7
          args.push(HEAPF64[buf >> 3])
          buf += 8
        } else {
          buf = (buf + 3) & ~3
          args.push(HEAP32[buf >> 2])
          buf += 4
        }
      }
      return args
    }
    var FSNode = function (parent, name, mode, rdev) {
      if (!parent) {
        parent = this
      }
      this.parent = parent
      this.mount = parent.mount
      this.mounted = null
      this.id = FS.nextInode++
      this.name = name
      this.mode = mode
      this.node_ops = {}
      this.stream_ops = {}
      this.rdev = rdev
    }
    var readMode = 292 | 73
    var writeMode = 146
    Object.defineProperties(FSNode.prototype, {
      read: {
        get: function () {
          return (this.mode & readMode) === readMode
        },
        set: function (val) {
          val ? (this.mode |= readMode) : (this.mode &= ~readMode)
        }
      },
      write: {
        get: function () {
          return (this.mode & writeMode) === writeMode
        },
        set: function (val) {
          val ? (this.mode |= writeMode) : (this.mode &= ~writeMode)
        }
      },
      isFolder: {
        get: function () {
          return FS.isDir(this.mode)
        }
      },
      isDevice: {
        get: function () {
          return FS.isChrdev(this.mode)
        }
      }
    })
    FS.FSNode = FSNode
    FS.staticInit()
    Module['requestFullscreen'] = function Module_requestFullscreen(lockPointer, resizeCanvas) {
      Browser.requestFullscreen(lockPointer, resizeCanvas)
    }
    Module['requestAnimationFrame'] = function Module_requestAnimationFrame(func) {
      Browser.requestAnimationFrame(func)
    }
    Module['setCanvasSize'] = function Module_setCanvasSize(width, height, noUpdates) {
      Browser.setCanvasSize(width, height, noUpdates)
    }
    Module['pauseMainLoop'] = function Module_pauseMainLoop() {
      Browser.mainLoop.pause()
    }
    Module['resumeMainLoop'] = function Module_resumeMainLoop() {
      Browser.mainLoop.resume()
    }
    Module['getUserMedia'] = function Module_getUserMedia() {
      Browser.getUserMedia()
    }
    Module['createContext'] = function Module_createContext(
      canvas,
      useWebGL,
      setInModule,
      webGLContextAttributes
    ) {
      return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes)
    }
    var GLctx
    GL.init()
    for (var i = 0; i < 32; i++) __tempFixedLengthArray.push(new Array(i))
    Module['request_quit'] = function () {
      GodotOS.request_quit()
    }
    Module['onExit'] = GodotOS.cleanup
    GodotOS._fs_sync_promise = Promise.resolve()
    Module['initConfig'] = GodotConfig.init_config
    Module['initFS'] = GodotFS.init
    Module['copyToFS'] = GodotFS.copy_to_fs
    GodotOS.atexit(function (resolve, reject) {
      GodotDisplayCursor.clear()
      resolve()
    })
    GodotOS.atexit(function (resolve, reject) {
      GodotEventListeners.clear()
      resolve()
    })
    GodotOS.atexit(function (resolve, reject) {
      GodotDisplayVK.clear()
      resolve()
    })
    GodotJSWrapper.proxies = new Map()
    MONO.export_functions(Module)
    BINDING.export_functions(Module)
    function intArrayFromString(stringy, dontAddNull, length) {
      var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1
      var u8array = new Array(len)
      var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length)
      if (dontAddNull) u8array.length = numBytesWritten
      return u8array
    }
    var asmLibraryArg = {
      fa: ___assert_fail,
      ij: ___clock_gettime,
      $k: ___cxa_allocate_exception,
      l: ___cxa_atexit,
      gk: ___cxa_begin_catch,
      Zj: ___cxa_end_catch,
      Ek: ___cxa_find_matching_catch_3,
      Qk: ___cxa_throw,
      Ii: ___map_file,
      Tj: ___resumeException,
      Ri: ___syscall10,
      ma: ___syscall102,
      Pi: ___syscall12,
      bj: ___syscall122,
      hj: ___syscall142,
      Ni: ___syscall144,
      dc: ___syscall15,
      gj: ___syscall168,
      Si: ___syscall183,
      Li: ___syscall192,
      Oi: ___syscall194,
      cc: ___syscall195,
      nj: ___syscall196,
      kj: ___syscall197,
      $b: ___syscall199,
      ba: ___syscall20,
      db: ___syscall201,
      ac: ___syscall202,
      dj: ___syscall209,
      fj: ___syscall220,
      ya: ___syscall221,
      jj: ___syscall268,
      qj: ___syscall272,
      Ui: ___syscall3,
      mj: ___syscall320,
      Xi: ___syscall33,
      Ji: ___syscall38,
      pj: ___syscall39,
      $i: ___syscall40,
      Wi: ___syscall41,
      Vi: ___syscall42,
      ec: ___syscall5,
      bc: ___syscall54,
      _i: ___syscall63,
      aj: ___syscall77,
      Ti: ___syscall83,
      Yi: ___syscall85,
      Zi: ___syscall9,
      Mi: ___syscall91,
      lj: ___syscall94,
      cj: ___syscall96,
      ej: ___syscall97,
      W: _abort,
      oj: _atexit,
      jh: _clock_getres,
      Wa: _clock_gettime,
      wk: compile_funtion,
      Sf: _dlclose,
      pb: _dlerror,
      Xb: _dlopen,
      lg: _dlsym,
      ic: _eglGetProcAddress,
      ob: _emscripten_asm_const_iii,
      Ub: _emscripten_cancel_main_loop,
      Oc: _emscripten_force_exit,
      ii: _emscripten_glActiveTexture,
      hi: _emscripten_glAttachShader,
      ff: _emscripten_glBeginQuery,
      zi: _emscripten_glBeginQueryEXT,
      Le: _emscripten_glBeginTransformFeedback,
      gi: _emscripten_glBindAttribLocation,
      fi: _emscripten_glBindBuffer,
      Ie: _emscripten_glBindBufferBase,
      Je: _emscripten_glBindBufferRange,
      ei: _emscripten_glBindFramebuffer,
      di: _emscripten_glBindRenderbuffer,
      Ld: _emscripten_glBindSampler,
      ci: _emscripten_glBindTexture,
      Cd: _emscripten_glBindTransformFeedback,
      Se: _emscripten_glBindVertexArray,
      qi: _emscripten_glBindVertexArrayOES,
      bi: _emscripten_glBlendColor,
      ai: _emscripten_glBlendEquation,
      $h: _emscripten_glBlendEquationSeparate,
      _h: _emscripten_glBlendFunc,
      Zh: _emscripten_glBlendFuncSeparate,
      Ve: _emscripten_glBlitFramebuffer,
      Yh: _emscripten_glBufferData,
      Xh: _emscripten_glBufferSubData,
      Wh: _emscripten_glCheckFramebufferStatus,
      Vh: _emscripten_glClear,
      je: _emscripten_glClearBufferfi,
      ke: _emscripten_glClearBufferfv,
      me: _emscripten_glClearBufferiv,
      le: _emscripten_glClearBufferuiv,
      Uh: _emscripten_glClearColor,
      Th: _emscripten_glClearDepthf,
      Sh: _emscripten_glClearStencil,
      Vd: _emscripten_glClientWaitSync,
      Rh: _emscripten_glColorMask,
      Qh: _emscripten_glCompileShader,
      Ph: _emscripten_glCompressedTexImage2D,
      mf: _emscripten_glCompressedTexImage3D,
      Oh: _emscripten_glCompressedTexSubImage2D,
      kf: _emscripten_glCompressedTexSubImage3D,
      ge: _emscripten_glCopyBufferSubData,
      Nh: _emscripten_glCopyTexImage2D,
      Mh: _emscripten_glCopyTexSubImage2D,
      nf: _emscripten_glCopyTexSubImage3D,
      Lh: _emscripten_glCreateProgram,
      Kh: _emscripten_glCreateShader,
      Jh: _emscripten_glCullFace,
      Ih: _emscripten_glDeleteBuffers,
      Hh: _emscripten_glDeleteFramebuffers,
      Gh: _emscripten_glDeleteProgram,
      hf: _emscripten_glDeleteQueries,
      Bi: _emscripten_glDeleteQueriesEXT,
      Fh: _emscripten_glDeleteRenderbuffers,
      Nd: _emscripten_glDeleteSamplers,
      Eh: _emscripten_glDeleteShader,
      Wd: _emscripten_glDeleteSync,
      Dh: _emscripten_glDeleteTextures,
      Bd: _emscripten_glDeleteTransformFeedbacks,
      Re: _emscripten_glDeleteVertexArrays,
      pi: _emscripten_glDeleteVertexArraysOES,
      Ch: _emscripten_glDepthFunc,
      Bh: _emscripten_glDepthMask,
      Ah: _emscripten_glDepthRangef,
      zh: _emscripten_glDetachShader,
      yh: _emscripten_glDisable,
      xh: _emscripten_glDisableVertexAttribArray,
      wh: _emscripten_glDrawArrays,
      $d: _emscripten_glDrawArraysInstanced,
      li: _emscripten_glDrawArraysInstancedANGLE,
      kd: _emscripten_glDrawArraysInstancedARB,
      uf: _emscripten_glDrawArraysInstancedEXT,
      ld: _emscripten_glDrawArraysInstancedNV,
      bf: _emscripten_glDrawBuffers,
      sf: _emscripten_glDrawBuffersEXT,
      mi: _emscripten_glDrawBuffersWEBGL,
      vh: _emscripten_glDrawElements,
      _d: _emscripten_glDrawElementsInstanced,
      ki: _emscripten_glDrawElementsInstancedANGLE,
      id: _emscripten_glDrawElementsInstancedARB,
      jd: _emscripten_glDrawElementsInstancedEXT,
      tf: _emscripten_glDrawElementsInstancedNV,
      qf: _emscripten_glDrawRangeElements,
      th: _emscripten_glEnable,
      sh: _emscripten_glEnableVertexAttribArray,
      ef: _emscripten_glEndQuery,
      yi: _emscripten_glEndQueryEXT,
      Ke: _emscripten_glEndTransformFeedback,
      Yd: _emscripten_glFenceSync,
      rh: _emscripten_glFinish,
      qh: _emscripten_glFlush,
      ph: _emscripten_glFramebufferRenderbuffer,
      oh: _emscripten_glFramebufferTexture2D,
      Te: _emscripten_glFramebufferTextureLayer,
      nh: _emscripten_glFrontFace,
      mh: _emscripten_glGenBuffers,
      kh: _emscripten_glGenFramebuffers,
      jf: _emscripten_glGenQueries,
      Ci: _emscripten_glGenQueriesEXT,
      ih: _emscripten_glGenRenderbuffers,
      Pd: _emscripten_glGenSamplers,
      hh: _emscripten_glGenTextures,
      Ad: _emscripten_glGenTransformFeedbacks,
      Oe: _emscripten_glGenVertexArrays,
      oi: _emscripten_glGenVertexArraysOES,
      lh: _emscripten_glGenerateMipmap,
      gh: _emscripten_glGetActiveAttrib,
      fh: _emscripten_glGetActiveUniform,
      be: _emscripten_glGetActiveUniformBlockName,
      ce: _emscripten_glGetActiveUniformBlockiv,
      ee: _emscripten_glGetActiveUniformsiv,
      eh: _emscripten_glGetAttachedShaders,
      dh: _emscripten_glGetAttribLocation,
      ch: _emscripten_glGetBooleanv,
      Qd: _emscripten_glGetBufferParameteri64v,
      bh: _emscripten_glGetBufferParameteriv,
      ah: _emscripten_glGetError,
      $g: _emscripten_glGetFloatv,
      we: _emscripten_glGetFragDataLocation,
      _g: _emscripten_glGetFramebufferAttachmentParameteriv,
      Rd: _emscripten_glGetInteger64i_v,
      Td: _emscripten_glGetInteger64v,
      Me: _emscripten_glGetIntegeri_v,
      Zg: _emscripten_glGetIntegerv,
      od: _emscripten_glGetInternalformativ,
      wd: _emscripten_glGetProgramBinary,
      Xg: _emscripten_glGetProgramInfoLog,
      Yg: _emscripten_glGetProgramiv,
      ti: _emscripten_glGetQueryObjecti64vEXT,
      vi: _emscripten_glGetQueryObjectivEXT,
      si: _emscripten_glGetQueryObjectui64vEXT,
      cf: _emscripten_glGetQueryObjectuiv,
      ui: _emscripten_glGetQueryObjectuivEXT,
      df: _emscripten_glGetQueryiv,
      wi: _emscripten_glGetQueryivEXT,
      Wg: _emscripten_glGetRenderbufferParameteriv,
      Fd: _emscripten_glGetSamplerParameterfv,
      Gd: _emscripten_glGetSamplerParameteriv,
      Ug: _emscripten_glGetShaderInfoLog,
      Tg: _emscripten_glGetShaderPrecisionFormat,
      Sg: _emscripten_glGetShaderSource,
      Vg: _emscripten_glGetShaderiv,
      Rg: _emscripten_glGetString,
      he: _emscripten_glGetStringi,
      Sd: _emscripten_glGetSynciv,
      Qg: _emscripten_glGetTexParameterfv,
      Pg: _emscripten_glGetTexParameteriv,
      Ge: _emscripten_glGetTransformFeedbackVarying,
      de: _emscripten_glGetUniformBlockIndex,
      fe: _emscripten_glGetUniformIndices,
      Mg: _emscripten_glGetUniformLocation,
      Og: _emscripten_glGetUniformfv,
      Ng: _emscripten_glGetUniformiv,
      xe: _emscripten_glGetUniformuiv,
      De: _emscripten_glGetVertexAttribIiv,
      Ce: _emscripten_glGetVertexAttribIuiv,
      Jg: _emscripten_glGetVertexAttribPointerv,
      Lg: _emscripten_glGetVertexAttribfv,
      Kg: _emscripten_glGetVertexAttribiv,
      Ig: _emscripten_glHint,
      td: _emscripten_glInvalidateFramebuffer,
      rd: _emscripten_glInvalidateSubFramebuffer,
      Hg: _emscripten_glIsBuffer,
      Fg: _emscripten_glIsEnabled,
      Eg: _emscripten_glIsFramebuffer,
      Dg: _emscripten_glIsProgram,
      gf: _emscripten_glIsQuery,
      Ai: _emscripten_glIsQueryEXT,
      Cg: _emscripten_glIsRenderbuffer,
      Md: _emscripten_glIsSampler,
      Bg: _emscripten_glIsShader,
      Xd: _emscripten_glIsSync,
      Ag: _emscripten_glIsTexture,
      zd: _emscripten_glIsTransformFeedback,
      Ne: _emscripten_glIsVertexArray,
      ni: _emscripten_glIsVertexArrayOES,
      zg: _emscripten_glLineWidth,
      yg: _emscripten_glLinkProgram,
      yd: _emscripten_glPauseTransformFeedback,
      xg: _emscripten_glPixelStorei,
      wg: _emscripten_glPolygonOffset,
      vd: _emscripten_glProgramBinary,
      ud: _emscripten_glProgramParameteri,
      xi: _emscripten_glQueryCounterEXT,
      rf: _emscripten_glReadBuffer,
      vg: _emscripten_glReadPixels,
      ug: _emscripten_glReleaseShaderCompiler,
      tg: _emscripten_glRenderbufferStorage,
      Ue: _emscripten_glRenderbufferStorageMultisample,
      xd: _emscripten_glResumeTransformFeedback,
      sg: _emscripten_glSampleCoverage,
      Id: _emscripten_glSamplerParameterf,
      Hd: _emscripten_glSamplerParameterfv,
      Kd: _emscripten_glSamplerParameteri,
      Jd: _emscripten_glSamplerParameteriv,
      rg: _emscripten_glScissor,
      qg: _emscripten_glShaderBinary,
      pg: _emscripten_glShaderSource,
      og: _emscripten_glStencilFunc,
      ng: _emscripten_glStencilFuncSeparate,
      mg: _emscripten_glStencilMask,
      kg: _emscripten_glStencilMaskSeparate,
      jg: _emscripten_glStencilOp,
      ig: _emscripten_glStencilOpSeparate,
      hg: _emscripten_glTexImage2D,
      pf: _emscripten_glTexImage3D,
      gg: _emscripten_glTexParameterf,
      fg: _emscripten_glTexParameterfv,
      eg: _emscripten_glTexParameteri,
      dg: _emscripten_glTexParameteriv,
      qd: _emscripten_glTexStorage2D,
      pd: _emscripten_glTexStorage3D,
      cg: _emscripten_glTexSubImage2D,
      of: _emscripten_glTexSubImage3D,
      He: _emscripten_glTransformFeedbackVaryings,
      bg: _emscripten_glUniform1f,
      ag: _emscripten_glUniform1fv,
      $f: _emscripten_glUniform1i,
      _f: _emscripten_glUniform1iv,
      ve: _emscripten_glUniform1ui,
      qe: _emscripten_glUniform1uiv,
      Zf: _emscripten_glUniform2f,
      Yf: _emscripten_glUniform2fv,
      Xf: _emscripten_glUniform2i,
      Wf: _emscripten_glUniform2iv,
      ue: _emscripten_glUniform2ui,
      pe: _emscripten_glUniform2uiv,
      Vf: _emscripten_glUniform3f,
      Uf: _emscripten_glUniform3fv,
      Tf: _emscripten_glUniform3i,
      Rf: _emscripten_glUniform3iv,
      se: _emscripten_glUniform3ui,
      oe: _emscripten_glUniform3uiv,
      Qf: _emscripten_glUniform4f,
      Pf: _emscripten_glUniform4fv,
      Of: _emscripten_glUniform4i,
      Nf: _emscripten_glUniform4iv,
      re: _emscripten_glUniform4ui,
      ne: _emscripten_glUniform4uiv,
      ae: _emscripten_glUniformBlockBinding,
      Mf: _emscripten_glUniformMatrix2fv,
      af: _emscripten_glUniformMatrix2x3fv,
      Ze: _emscripten_glUniformMatrix2x4fv,
      Lf: _emscripten_glUniformMatrix3fv,
      _e: _emscripten_glUniformMatrix3x2fv,
      Xe: _emscripten_glUniformMatrix3x4fv,
      Kf: _emscripten_glUniformMatrix4fv,
      Ye: _emscripten_glUniformMatrix4x2fv,
      We: _emscripten_glUniformMatrix4x3fv,
      Jf: _emscripten_glUseProgram,
      If: _emscripten_glValidateProgram,
      Gf: _emscripten_glVertexAttrib1f,
      Ff: _emscripten_glVertexAttrib1fv,
      Ef: _emscripten_glVertexAttrib2f,
      Df: _emscripten_glVertexAttrib2fv,
      Cf: _emscripten_glVertexAttrib3f,
      Bf: _emscripten_glVertexAttrib3fv,
      Af: _emscripten_glVertexAttrib4f,
      zf: _emscripten_glVertexAttrib4fv,
      Ed: _emscripten_glVertexAttribDivisor,
      ji: _emscripten_glVertexAttribDivisorANGLE,
      md: _emscripten_glVertexAttribDivisorARB,
      vf: _emscripten_glVertexAttribDivisorEXT,
      nd: _emscripten_glVertexAttribDivisorNV,
      Be: _emscripten_glVertexAttribI4i,
      ze: _emscripten_glVertexAttribI4iv,
      Ae: _emscripten_glVertexAttribI4ui,
      ye: _emscripten_glVertexAttribI4uiv,
      Fe: _emscripten_glVertexAttribIPointer,
      yf: _emscripten_glVertexAttribPointer,
      xf: _emscripten_glViewport,
      Ud: _emscripten_glWaitSync,
      R: _emscripten_longjmp,
      Di: _emscripten_memcpy_big,
      Ei: _emscripten_resize_heap,
      Tb: _emscripten_set_main_loop,
      Cc: _emscripten_webgl_commit_frame,
      yl: _emscripten_webgl_create_context,
      cl: _emscripten_webgl_destroy_context,
      zl: _emscripten_webgl_init_context_attributes,
      xl: _emscripten_webgl_make_context_current,
      Gi: _environ_get,
      Hi: _environ_sizes_get,
      ca: _exit,
      Ma: _fd_close,
      Zb: _fd_fdstat_get,
      Ki: _fd_read,
      ed: _fd_seek,
      Qi: _fd_sync,
      Eb: _fd_write,
      ri: _fork,
      Pb: _gai_strerror,
      j: _getTempRet0,
      qb: _getaddrinfo,
      uj: _getgrgid_r,
      sj: _getgrnam_r,
      rb: _getnameinfo,
      Gg: _getprotobyname,
      da: _gettimeofday,
      c: _glActiveTexture,
      tb: _glAttachShader,
      Kb: _glBeginTransformFeedback,
      lc: _glBindAttribLocation,
      b: _glBindBuffer,
      aa: _glBindBufferBase,
      e: _glBindFramebuffer,
      ua: _glBindRenderbuffer,
      a: _glBindTexture,
      o: _glBindVertexArray,
      K: _glBlendEquation,
      ra: _glBlendFunc,
      y: _glBlendFuncSeparate,
      Fa: _glBlitFramebuffer,
      s: _glBufferData,
      V: _glBufferSubData,
      Y: _glCheckFramebufferStatus,
      U: _glClear,
      Oa: _glClearBufferfv,
      _: _glClearColor,
      wa: _glClearDepthf,
      Z: _glColorMask,
      Ca: _glCompileShader,
      pc: _glCompressedTexImage2D,
      Ej: _glCompressedTexSubImage2D,
      oc: _glCompressedTexSubImage3D,
      Cj: _glCopyBufferSubData,
      Hb: _glCopyTexSubImage2D,
      Ib: _glCreateProgram,
      ab: _glCreateShader,
      Pa: _glCullFace,
      X: _glDeleteBuffers,
      O: _glDeleteFramebuffers,
      ga: _glDeleteProgram,
      la: _glDeleteRenderbuffers,
      T: _glDeleteShader,
      D: _glDeleteTextures,
      Ba: _glDeleteVertexArrays,
      sa: _glDepthFunc,
      S: _glDepthMask,
      i: _glDisable,
      r: _glDisableVertexAttribArray,
      E: _glDrawArrays,
      Ua: _glDrawArraysInstanced,
      jb: _glDrawBuffers,
      xa: _glDrawElements,
      kb: _glDrawElementsInstanced,
      t: _glEnable,
      k: _glEnableVertexAttribArray,
      Jb: _glEndTransformFeedback,
      sc: _glFinish,
      ta: _glFramebufferRenderbuffer,
      A: _glFramebufferTexture2D,
      Dj: _glFramebufferTextureLayer,
      qc: _glFrontFace,
      F: _glGenBuffers,
      N: _glGenFramebuffers,
      Ea: _glGenRenderbuffers,
      x: _glGenTextures,
      na: _glGenVertexArrays,
      ha: _glGenerateMipmap,
      rc: _glGetError,
      mc: _glGetFloatv,
      va: _glGetIntegerv,
      vj: _glGetProgramBinary,
      jc: _glGetProgramInfoLog,
      $a: _glGetProgramiv,
      ub: _glGetShaderInfoLog,
      tj: _glGetShaderSource,
      Aa: _glGetShaderiv,
      Sa: _glGetString,
      Bj: _glGetStringi,
      zj: _glGetUniformBlockIndex,
      Ra: _glGetUniformLocation,
      Gj: _glInvalidateFramebuffer,
      kc: _glLinkProgram,
      Ga: _glPixelStorei,
      Aj: _glProgramBinary,
      wj: _glProgramParameteri,
      Ia: _glReadBuffer,
      Lb: _glReadPixels,
      Da: _glRenderbufferStorage,
      fb: _glRenderbufferStorageMultisample,
      ea: _glScissor,
      sb: _glShaderSource,
      u: _glTexImage2D,
      ib: _glTexImage3D,
      g: _glTexParameterf,
      d: _glTexParameteri,
      Fj: _glTexStorage2D,
      hb: _glTexSubImage2D,
      vb: _glTexSubImage3D,
      xj: _glTransformFeedbackVaryings,
      f: _glUniform1f,
      w: _glUniform1i,
      Nb: _glUniform1iv,
      nc: _glUniform1ui,
      Gb: _glUniform2f,
      p: _glUniform2fv,
      _a: _glUniform2i,
      Ha: _glUniform2iv,
      Fb: _glUniform3f,
      qa: _glUniform3fv,
      Za: _glUniform3i,
      Ta: _glUniform4f,
      B: _glUniform4fv,
      Ya: _glUniform4i,
      yj: _glUniformBlockBinding,
      hc: _glUniformMatrix2fv,
      gc: _glUniformMatrix3fv,
      q: _glUniformMatrix4fv,
      Na: _glUseProgram,
      C: _glVertexAttrib4f,
      ia: _glVertexAttrib4fv,
      Q: _glVertexAttribDivisor,
      Hj: _glVertexAttribI4ui,
      nb: _glVertexAttribIPointer,
      h: _glVertexAttribPointer,
      v: _glViewport,
      zb: _gmtime_r,
      $e: _godot_audio_capture_start,
      Pe: _godot_audio_capture_stop,
      Ee: _godot_audio_has_script_processor,
      Zd: _godot_audio_has_worklet,
      wf: _godot_audio_init,
      Hf: _godot_audio_is_available,
      lf: _godot_audio_resume,
      te: _godot_audio_script_create,
      ie: _godot_audio_script_start,
      Od: _godot_audio_worklet_create,
      Dd: _godot_audio_worklet_start_no_threads,
      Tk: _godot_js_config_canvas_id_get,
      Lc: _godot_js_config_locale_get,
      _k: _godot_js_display_alert,
      Hl: _godot_js_display_canvas_focus,
      Il: _godot_js_display_canvas_is_focused,
      Cl: _godot_js_display_clipboard_get,
      Dl: _godot_js_display_clipboard_set,
      Kl: _godot_js_display_cursor_is_hidden,
      Jl: _godot_js_display_cursor_is_locked,
      Qb: _godot_js_display_cursor_lock_set,
      Sb: _godot_js_display_cursor_set_custom_shape,
      Ec: _godot_js_display_cursor_set_shape,
      Rb: _godot_js_display_cursor_set_visible,
      Ic: _godot_js_display_desired_size_set,
      ol: _godot_js_display_fullscreen_cb,
      Fc: _godot_js_display_fullscreen_exit,
      Gc: _godot_js_display_fullscreen_request,
      sd: _godot_js_display_glGetBufferSubData,
      Dc: _godot_js_display_has_webgl,
      Al: _godot_js_display_is_swap_ok_cancel,
      ml: _godot_js_display_notification_cb,
      dl: _godot_js_display_pixel_ratio_get,
      el: _godot_js_display_screen_dpi_get,
      Jc: _godot_js_display_screen_size_get,
      Bl: _godot_js_display_setup_canvas,
      Kc: _godot_js_display_size_update,
      Gl: _godot_js_display_touchscreen_is_available,
      kl: _godot_js_display_vk_available,
      ll: _godot_js_display_vk_cb,
      hl: _godot_js_display_vk_hide,
      il: _godot_js_display_vk_show,
      nl: _godot_js_display_window_blur_cb,
      Yk: _godot_js_display_window_icon_set,
      Hc: _godot_js_display_window_size_get,
      Zk: _godot_js_display_window_title_set,
      Rc: _godot_js_eval,
      ad: _godot_js_fetch_body_length_get,
      dd: _godot_js_fetch_create,
      Wb: _godot_js_fetch_free,
      _c: _godot_js_fetch_http_status_get,
      bd: _godot_js_fetch_is_chunked,
      $c: _godot_js_fetch_read_chunk,
      Zc: _godot_js_fetch_read_headers,
      Cb: _godot_js_fetch_state_get,
      pl: _godot_js_input_drop_files_cb,
      rl: _godot_js_input_gamepad_cb,
      fl: _godot_js_input_gamepad_sample,
      Fl: _godot_js_input_gamepad_sample_count,
      El: _godot_js_input_gamepad_sample_get,
      sl: _godot_js_input_key_cb,
      wl: _godot_js_input_mouse_button_cb,
      vl: _godot_js_input_mouse_move_cb,
      ul: _godot_js_input_mouse_wheel_cb,
      ql: _godot_js_input_paste_cb,
      tl: _godot_js_input_touch_cb,
      Wk: _godot_js_input_vibrate_handheld,
      Qc: _godot_js_os_download_buffer,
      bl: _godot_js_os_execute,
      Mc: _godot_js_os_finish_async,
      Sk: _godot_js_os_fs_is_persistent,
      gl: _godot_js_os_fs_sync,
      al: _godot_js_os_hw_concurrency_get,
      Uk: _godot_js_os_request_quit_cb,
      Xk: _godot_js_os_shell_open,
      Rk: _godot_js_pwa_cb,
      Vk: _godot_js_pwa_update,
      uk: _godot_js_rtc_datachannel_close,
      kk: _godot_js_rtc_datachannel_connect,
      hk: _godot_js_rtc_datachannel_destroy,
      lk: _godot_js_rtc_datachannel_get_buffered_amount,
      pk: _godot_js_rtc_datachannel_id_get,
      mk: _godot_js_rtc_datachannel_is_negotiated,
      qk: _godot_js_rtc_datachannel_is_ordered,
      jk: _godot_js_rtc_datachannel_label_get,
      ok: _godot_js_rtc_datachannel_max_packet_lifetime_get,
      nk: _godot_js_rtc_datachannel_max_retransmits_get,
      ik: _godot_js_rtc_datachannel_protocol_get,
      tk: _godot_js_rtc_datachannel_ready_state_get,
      sk: _godot_js_rtc_datachannel_send,
      fk: _godot_js_rtc_pc_close,
      ak: _godot_js_rtc_pc_create,
      $j: _godot_js_rtc_pc_datachannel_create,
      zc: _godot_js_rtc_pc_destroy,
      bk: _godot_js_rtc_pc_ice_candidate_add,
      dk: _godot_js_rtc_pc_local_description_set,
      ek: _godot_js_rtc_pc_offer_create,
      ck: _godot_js_rtc_pc_remote_description_set,
      yc: _godot_js_websocket_buffered_amount,
      Yj: _godot_js_websocket_close,
      Xj: _godot_js_websocket_create,
      xc: _godot_js_websocket_destroy,
      _j: _godot_js_websocket_send,
      Uc: _godot_js_wrapper_create_cb,
      Sc: _godot_js_wrapper_create_object,
      Tc: _godot_js_wrapper_interface_get,
      Vc: _godot_js_wrapper_object_call,
      Xc: _godot_js_wrapper_object_get,
      Vb: _godot_js_wrapper_object_getvar,
      Yc: _godot_js_wrapper_object_set,
      Wc: _godot_js_wrapper_object_setvar,
      Pc: _godot_js_wrapper_object_unref,
      Lj: _godot_webxr_commit_for_eye,
      Uj: _godot_webxr_get_bounds_geometry,
      uc: _godot_webxr_get_controller_axes,
      Ij: _godot_webxr_get_controller_buttons,
      Kj: _godot_webxr_get_controller_count,
      xb: _godot_webxr_get_controller_target_ray_mode,
      Jj: _godot_webxr_get_controller_transform,
      Mj: _godot_webxr_get_projection_for_eye,
      Oj: _godot_webxr_get_render_targetsize,
      Nj: _godot_webxr_get_transform_for_eye,
      Sj: _godot_webxr_get_view_count,
      Vj: _godot_webxr_get_visibility_state,
      Qj: _godot_webxr_initialize,
      vc: _godot_webxr_is_controller_connected,
      Wj: _godot_webxr_is_session_supported,
      Rj: _godot_webxr_is_supported,
      wc: _godot_webxr_sample_controller_data,
      Pj: _godot_webxr_uninitialize,
      bb: invoke_ii,
      Ja: invoke_iii,
      yb: invoke_iiii,
      Bc: invoke_iiiii,
      vk: invoke_iiiiii,
      rj: invoke_iiiiiii,
      fc: invoke_iiiiiiiiii,
      fd: invoke_iiiij,
      oa: invoke_vi,
      cb: invoke_vii,
      La: invoke_viii,
      Va: invoke_viiii,
      Ac: invoke_viiiiiii,
      Yb: _kill,
      rk: _llvm_eh_typeid_for,
      M: _localtime_r,
      memory: wasmMemory,
      jl: _mono_set_timeout,
      Nc: _mono_wasm_add_array_item,
      gd: _mono_wasm_add_array_var,
      Ll: _mono_wasm_add_bool_var,
      cd: _mono_wasm_add_frame,
      Ka: _mono_wasm_add_number_var,
      hd: _mono_wasm_add_obj_var,
      Bb: _mono_wasm_add_properties_var,
      Ab: _mono_wasm_add_string_var,
      Dk: _mono_wasm_bind_core_object,
      Ck: _mono_wasm_bind_host_object,
      Qe: _mono_wasm_fire_bp,
      Lk: _mono_wasm_get_by_index,
      Ik: _mono_wasm_get_global_object,
      Mk: _mono_wasm_get_object_property,
      Pk: _mono_wasm_invoke_js_marshalled,
      Ok: _mono_wasm_invoke_js_unmarshalled,
      Nk: _mono_wasm_invoke_js_with_args,
      Bk: _mono_wasm_new,
      Fk: _mono_wasm_new_object,
      Hk: _mono_wasm_release_handle,
      Gk: _mono_wasm_release_object,
      Jk: _mono_wasm_set_by_index,
      Kk: _mono_wasm_set_object_property,
      xk: _mono_wasm_typed_array_copy_from,
      zk: _mono_wasm_typed_array_copy_to,
      yk: _mono_wasm_typed_array_from,
      Ak: _mono_wasm_typed_array_to_array,
      Qa: _nanosleep,
      ja: _pthread_cleanup_pop,
      ka: _pthread_cleanup_push,
      G: _pthread_mutexattr_destroy,
      J: _pthread_mutexattr_init,
      H: _pthread_mutexattr_setprotocol,
      I: _pthread_mutexattr_settype,
      Xa: _pthread_setcancelstate,
      $: _round,
      P: _roundf,
      pa: _saveSetjmp,
      uh: _schedule_background_exec,
      gb: _sem_destroy,
      lb: _sem_init,
      eb: _sem_post,
      Mb: _sem_trywait,
      Ob: _sem_wait,
      m: _setTempRet0,
      mb: _sigaction,
      wb: _sigemptyset,
      L: _strftime,
      Fi: _strftime_l,
      za: _sysconf,
      table: wasmTable,
      n: _testSetjmp,
      z: _time,
      tc: _utime,
      _b: _utimes,
      Db: _waitpid
    }
    var asm = createWasm()
    Module['asm'] = asm
    var ___wasm_call_ctors = (Module['___wasm_call_ctors'] = function () {
      return (___wasm_call_ctors = Module['___wasm_call_ctors'] = Module['asm']['Ml']).apply(
        null,
        arguments
      )
    })
    var _fflush = (Module['_fflush'] = function () {
      return (_fflush = Module['_fflush'] = Module['asm']['Nl']).apply(null, arguments)
    })
    var _mono_print_method_from_ip = (Module['_mono_print_method_from_ip'] = function () {
      return (_mono_print_method_from_ip = Module['_mono_print_method_from_ip'] =
        Module['asm']['Ol']).apply(null, arguments)
    })
    var _mono_wasm_setup_single_step = (Module['_mono_wasm_setup_single_step'] = function () {
      return (_mono_wasm_setup_single_step = Module['_mono_wasm_setup_single_step'] =
        Module['asm']['Pl']).apply(null, arguments)
    })
    var _mono_wasm_clear_all_breakpoints = (Module['_mono_wasm_clear_all_breakpoints'] =
      function () {
        return (_mono_wasm_clear_all_breakpoints = Module['_mono_wasm_clear_all_breakpoints'] =
          Module['asm']['Ql']).apply(null, arguments)
      })
    var _mono_wasm_set_breakpoint = (Module['_mono_wasm_set_breakpoint'] = function () {
      return (_mono_wasm_set_breakpoint = Module['_mono_wasm_set_breakpoint'] =
        Module['asm']['Rl']).apply(null, arguments)
    })
    var _mono_wasm_remove_breakpoint = (Module['_mono_wasm_remove_breakpoint'] = function () {
      return (_mono_wasm_remove_breakpoint = Module['_mono_wasm_remove_breakpoint'] =
        Module['asm']['Sl']).apply(null, arguments)
    })
    var _mono_wasm_current_bp_id = (Module['_mono_wasm_current_bp_id'] = function () {
      return (_mono_wasm_current_bp_id = Module['_mono_wasm_current_bp_id'] =
        Module['asm']['Tl']).apply(null, arguments)
    })
    var _mono_wasm_enum_frames = (Module['_mono_wasm_enum_frames'] = function () {
      return (_mono_wasm_enum_frames = Module['_mono_wasm_enum_frames'] =
        Module['asm']['Ul']).apply(null, arguments)
    })
    var _mono_wasm_get_var_info = (Module['_mono_wasm_get_var_info'] = function () {
      return (_mono_wasm_get_var_info = Module['_mono_wasm_get_var_info'] =
        Module['asm']['Vl']).apply(null, arguments)
    })
    var _mono_wasm_get_object_properties = (Module['_mono_wasm_get_object_properties'] =
      function () {
        return (_mono_wasm_get_object_properties = Module['_mono_wasm_get_object_properties'] =
          Module['asm']['Wl']).apply(null, arguments)
      })
    var _mono_wasm_get_array_values = (Module['_mono_wasm_get_array_values'] = function () {
      return (_mono_wasm_get_array_values = Module['_mono_wasm_get_array_values'] =
        Module['asm']['Xl']).apply(null, arguments)
    })
    var _mono_set_timeout_exec = (Module['_mono_set_timeout_exec'] = function () {
      return (_mono_set_timeout_exec = Module['_mono_set_timeout_exec'] =
        Module['asm']['Yl']).apply(null, arguments)
    })
    var ___errno_location = (Module['___errno_location'] = function () {
      return (___errno_location = Module['___errno_location'] = Module['asm']['Zl']).apply(
        null,
        arguments
      )
    })
    var _malloc = (Module['_malloc'] = function () {
      return (_malloc = Module['_malloc'] = Module['asm']['_l']).apply(null, arguments)
    })
    var _htonl = (Module['_htonl'] = function () {
      return (_htonl = Module['_htonl'] = Module['asm']['$l']).apply(null, arguments)
    })
    var _htons = (Module['_htons'] = function () {
      return (_htons = Module['_htons'] = Module['asm']['am']).apply(null, arguments)
    })
    var _ntohs = (Module['_ntohs'] = function () {
      return (_ntohs = Module['_ntohs'] = Module['asm']['bm']).apply(null, arguments)
    })
    var _free = (Module['_free'] = function () {
      return (_free = Module['_free'] = Module['asm']['cm']).apply(null, arguments)
    })
    var _mono_background_exec = (Module['_mono_background_exec'] = function () {
      return (_mono_background_exec = Module['_mono_background_exec'] = Module['asm']['dm']).apply(
        null,
        arguments
      )
    })
    var _realloc = (Module['_realloc'] = function () {
      return (_realloc = Module['_realloc'] = Module['asm']['em']).apply(null, arguments)
    })
    var __Z13godot_js_mainiPPc = (Module['__Z13godot_js_mainiPPc'] = function () {
      return (__Z13godot_js_mainiPPc = Module['__Z13godot_js_mainiPPc'] =
        Module['asm']['fm']).apply(null, arguments)
    })
    var _main = (Module['_main'] = function () {
      return (_main = Module['_main'] = Module['asm']['gm']).apply(null, arguments)
    })
    var _mono_wasm_add_assembly = (Module['_mono_wasm_add_assembly'] = function () {
      return (_mono_wasm_add_assembly = Module['_mono_wasm_add_assembly'] =
        Module['asm']['hm']).apply(null, arguments)
    })
    var _mono_wasm_setenv = (Module['_mono_wasm_setenv'] = function () {
      return (_mono_wasm_setenv = Module['_mono_wasm_setenv'] = Module['asm']['im']).apply(
        null,
        arguments
      )
    })
    var _mono_wasm_load_runtime = (Module['_mono_wasm_load_runtime'] = function () {
      return (_mono_wasm_load_runtime = Module['_mono_wasm_load_runtime'] =
        Module['asm']['jm']).apply(null, arguments)
    })
    var _mono_wasm_assembly_load = (Module['_mono_wasm_assembly_load'] = function () {
      return (_mono_wasm_assembly_load = Module['_mono_wasm_assembly_load'] =
        Module['asm']['km']).apply(null, arguments)
    })
    var _mono_wasm_assembly_find_class = (Module['_mono_wasm_assembly_find_class'] = function () {
      return (_mono_wasm_assembly_find_class = Module['_mono_wasm_assembly_find_class'] =
        Module['asm']['lm']).apply(null, arguments)
    })
    var _mono_wasm_assembly_find_method = (Module['_mono_wasm_assembly_find_method'] = function () {
      return (_mono_wasm_assembly_find_method = Module['_mono_wasm_assembly_find_method'] =
        Module['asm']['mm']).apply(null, arguments)
    })
    var _mono_wasm_invoke_method = (Module['_mono_wasm_invoke_method'] = function () {
      return (_mono_wasm_invoke_method = Module['_mono_wasm_invoke_method'] =
        Module['asm']['nm']).apply(null, arguments)
    })
    var _mono_wasm_assembly_get_entry_point = (Module['_mono_wasm_assembly_get_entry_point'] =
      function () {
        return (_mono_wasm_assembly_get_entry_point = Module[
          '_mono_wasm_assembly_get_entry_point'
        ] =
          Module['asm']['om']).apply(null, arguments)
      })
    var _mono_wasm_string_get_utf8 = (Module['_mono_wasm_string_get_utf8'] = function () {
      return (_mono_wasm_string_get_utf8 = Module['_mono_wasm_string_get_utf8'] =
        Module['asm']['pm']).apply(null, arguments)
    })
    var _mono_wasm_string_from_js = (Module['_mono_wasm_string_from_js'] = function () {
      return (_mono_wasm_string_from_js = Module['_mono_wasm_string_from_js'] =
        Module['asm']['qm']).apply(null, arguments)
    })
    var _mono_wasm_get_obj_type = (Module['_mono_wasm_get_obj_type'] = function () {
      return (_mono_wasm_get_obj_type = Module['_mono_wasm_get_obj_type'] =
        Module['asm']['rm']).apply(null, arguments)
    })
    var _mono_unbox_int = (Module['_mono_unbox_int'] = function () {
      return (_mono_unbox_int = Module['_mono_unbox_int'] = Module['asm']['sm']).apply(
        null,
        arguments
      )
    })
    var _mono_wasm_unbox_float = (Module['_mono_wasm_unbox_float'] = function () {
      return (_mono_wasm_unbox_float = Module['_mono_wasm_unbox_float'] =
        Module['asm']['tm']).apply(null, arguments)
    })
    var _mono_wasm_array_length = (Module['_mono_wasm_array_length'] = function () {
      return (_mono_wasm_array_length = Module['_mono_wasm_array_length'] =
        Module['asm']['um']).apply(null, arguments)
    })
    var _mono_wasm_array_get = (Module['_mono_wasm_array_get'] = function () {
      return (_mono_wasm_array_get = Module['_mono_wasm_array_get'] = Module['asm']['vm']).apply(
        null,
        arguments
      )
    })
    var _mono_wasm_obj_array_new = (Module['_mono_wasm_obj_array_new'] = function () {
      return (_mono_wasm_obj_array_new = Module['_mono_wasm_obj_array_new'] =
        Module['asm']['wm']).apply(null, arguments)
    })
    var _mono_wasm_obj_array_set = (Module['_mono_wasm_obj_array_set'] = function () {
      return (_mono_wasm_obj_array_set = Module['_mono_wasm_obj_array_set'] =
        Module['asm']['xm']).apply(null, arguments)
    })
    var _mono_wasm_string_array_new = (Module['_mono_wasm_string_array_new'] = function () {
      return (_mono_wasm_string_array_new = Module['_mono_wasm_string_array_new'] =
        Module['asm']['ym']).apply(null, arguments)
    })
    var _mono_wasm_exec_regression = (Module['_mono_wasm_exec_regression'] = function () {
      return (_mono_wasm_exec_regression = Module['_mono_wasm_exec_regression'] =
        Module['asm']['zm']).apply(null, arguments)
    })
    var _mono_wasm_exit = (Module['_mono_wasm_exit'] = function () {
      return (_mono_wasm_exit = Module['_mono_wasm_exit'] = Module['asm']['Am']).apply(
        null,
        arguments
      )
    })
    var _mono_wasm_set_main_args = (Module['_mono_wasm_set_main_args'] = function () {
      return (_mono_wasm_set_main_args = Module['_mono_wasm_set_main_args'] =
        Module['asm']['Bm']).apply(null, arguments)
    })
    var _mono_wasm_strdup = (Module['_mono_wasm_strdup'] = function () {
      return (_mono_wasm_strdup = Module['_mono_wasm_strdup'] = Module['asm']['Cm']).apply(
        null,
        arguments
      )
    })
    var _mono_wasm_parse_runtime_options = (Module['_mono_wasm_parse_runtime_options'] =
      function () {
        return (_mono_wasm_parse_runtime_options = Module['_mono_wasm_parse_runtime_options'] =
          Module['asm']['Dm']).apply(null, arguments)
      })
    var _mono_wasm_enable_on_demand_gc = (Module['_mono_wasm_enable_on_demand_gc'] = function () {
      return (_mono_wasm_enable_on_demand_gc = Module['_mono_wasm_enable_on_demand_gc'] =
        Module['asm']['Em']).apply(null, arguments)
    })
    var ___em_js__compile_funtion = (Module['___em_js__compile_funtion'] = function () {
      return (___em_js__compile_funtion = Module['___em_js__compile_funtion'] =
        Module['asm']['Fm']).apply(null, arguments)
    })
    var _mono_wasm_typed_array_new = (Module['_mono_wasm_typed_array_new'] = function () {
      return (_mono_wasm_typed_array_new = Module['_mono_wasm_typed_array_new'] =
        Module['asm']['Gm']).apply(null, arguments)
    })
    var _mono_wasm_unbox_enum = (Module['_mono_wasm_unbox_enum'] = function () {
      return (_mono_wasm_unbox_enum = Module['_mono_wasm_unbox_enum'] = Module['asm']['Hm']).apply(
        null,
        arguments
      )
    })
    var __emwebxr_on_input_event = (Module['__emwebxr_on_input_event'] = function () {
      return (__emwebxr_on_input_event = Module['__emwebxr_on_input_event'] =
        Module['asm']['Im']).apply(null, arguments)
    })
    var __emwebxr_on_simple_event = (Module['__emwebxr_on_simple_event'] = function () {
      return (__emwebxr_on_simple_event = Module['__emwebxr_on_simple_event'] =
        Module['asm']['Jm']).apply(null, arguments)
    })
    var __get_tzname = (Module['__get_tzname'] = function () {
      return (__get_tzname = Module['__get_tzname'] = Module['asm']['Km']).apply(null, arguments)
    })
    var __get_daylight = (Module['__get_daylight'] = function () {
      return (__get_daylight = Module['__get_daylight'] = Module['asm']['Lm']).apply(
        null,
        arguments
      )
    })
    var __get_timezone = (Module['__get_timezone'] = function () {
      return (__get_timezone = Module['__get_timezone'] = Module['asm']['Mm']).apply(
        null,
        arguments
      )
    })
    var _setThrew = (Module['_setThrew'] = function () {
      return (_setThrew = Module['_setThrew'] = Module['asm']['Nm']).apply(null, arguments)
    })
    var __ZSt18uncaught_exceptionv = (Module['__ZSt18uncaught_exceptionv'] = function () {
      return (__ZSt18uncaught_exceptionv = Module['__ZSt18uncaught_exceptionv'] =
        Module['asm']['Om']).apply(null, arguments)
    })
    var ___cxa_can_catch = (Module['___cxa_can_catch'] = function () {
      return (___cxa_can_catch = Module['___cxa_can_catch'] = Module['asm']['Pm']).apply(
        null,
        arguments
      )
    })
    var ___cxa_is_pointer_type = (Module['___cxa_is_pointer_type'] = function () {
      return (___cxa_is_pointer_type = Module['___cxa_is_pointer_type'] =
        Module['asm']['Qm']).apply(null, arguments)
    })
    var _emscripten_GetProcAddress = (Module['_emscripten_GetProcAddress'] = function () {
      return (_emscripten_GetProcAddress = Module['_emscripten_GetProcAddress'] =
        Module['asm']['Rm']).apply(null, arguments)
    })
    var _memalign = (Module['_memalign'] = function () {
      return (_memalign = Module['_memalign'] = Module['asm']['Sm']).apply(null, arguments)
    })
    var dynCall_v = (Module['dynCall_v'] = function () {
      return (dynCall_v = Module['dynCall_v'] = Module['asm']['Tm']).apply(null, arguments)
    })
    var dynCall_vi = (Module['dynCall_vi'] = function () {
      return (dynCall_vi = Module['dynCall_vi'] = Module['asm']['Um']).apply(null, arguments)
    })
    var dynCall_vii = (Module['dynCall_vii'] = function () {
      return (dynCall_vii = Module['dynCall_vii'] = Module['asm']['Vm']).apply(null, arguments)
    })
    var dynCall_viii = (Module['dynCall_viii'] = function () {
      return (dynCall_viii = Module['dynCall_viii'] = Module['asm']['Wm']).apply(null, arguments)
    })
    var dynCall_viiii = (Module['dynCall_viiii'] = function () {
      return (dynCall_viiii = Module['dynCall_viiii'] = Module['asm']['Xm']).apply(null, arguments)
    })
    var dynCall_viiiiiii = (Module['dynCall_viiiiiii'] = function () {
      return (dynCall_viiiiiii = Module['dynCall_viiiiiii'] = Module['asm']['Ym']).apply(
        null,
        arguments
      )
    })
    var dynCall_ii = (Module['dynCall_ii'] = function () {
      return (dynCall_ii = Module['dynCall_ii'] = Module['asm']['Zm']).apply(null, arguments)
    })
    var dynCall_iii = (Module['dynCall_iii'] = function () {
      return (dynCall_iii = Module['dynCall_iii'] = Module['asm']['_m']).apply(null, arguments)
    })
    var dynCall_iiii = (Module['dynCall_iiii'] = function () {
      return (dynCall_iiii = Module['dynCall_iiii'] = Module['asm']['$m']).apply(null, arguments)
    })
    var dynCall_iiiii = (Module['dynCall_iiiii'] = function () {
      return (dynCall_iiiii = Module['dynCall_iiiii'] = Module['asm']['an']).apply(null, arguments)
    })
    var dynCall_iiiiii = (Module['dynCall_iiiiii'] = function () {
      return (dynCall_iiiiii = Module['dynCall_iiiiii'] = Module['asm']['bn']).apply(
        null,
        arguments
      )
    })
    var dynCall_iiiiiii = (Module['dynCall_iiiiiii'] = function () {
      return (dynCall_iiiiiii = Module['dynCall_iiiiiii'] = Module['asm']['cn']).apply(
        null,
        arguments
      )
    })
    var dynCall_iiiiiiiiii = (Module['dynCall_iiiiiiiiii'] = function () {
      return (dynCall_iiiiiiiiii = Module['dynCall_iiiiiiiiii'] = Module['asm']['dn']).apply(
        null,
        arguments
      )
    })
    var dynCall_iiiij = (Module['dynCall_iiiij'] = function () {
      return (dynCall_iiiij = Module['dynCall_iiiij'] = Module['asm']['en']).apply(null, arguments)
    })
    var stackSave = (Module['stackSave'] = function () {
      return (stackSave = Module['stackSave'] = Module['asm']['fn']).apply(null, arguments)
    })
    var stackAlloc = (Module['stackAlloc'] = function () {
      return (stackAlloc = Module['stackAlloc'] = Module['asm']['gn']).apply(null, arguments)
    })
    var stackRestore = (Module['stackRestore'] = function () {
      return (stackRestore = Module['stackRestore'] = Module['asm']['hn']).apply(null, arguments)
    })
    function invoke_vi(index, a1) {
      var sp = stackSave()
      try {
        dynCall_vi(index, a1)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0 && e !== 'longjmp') throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vii(index, a1, a2) {
      var sp = stackSave()
      try {
        dynCall_vii(index, a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0 && e !== 'longjmp') throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viii(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        dynCall_viii(index, a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0 && e !== 'longjmp') throw e
        _setThrew(1, 0)
      }
    }
    function invoke_ii(index, a1) {
      var sp = stackSave()
      try {
        return dynCall_ii(index, a1)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0 && e !== 'longjmp') throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iii(index, a1, a2) {
      var sp = stackSave()
      try {
        return dynCall_iii(index, a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0 && e !== 'longjmp') throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiii(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        return dynCall_iiiii(index, a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0 && e !== 'longjmp') throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        return dynCall_iiiiii(index, a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0 && e !== 'longjmp') throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiii(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        dynCall_viiii(index, a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0 && e !== 'longjmp') throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiii(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        return dynCall_iiii(index, a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0 && e !== 'longjmp') throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        dynCall_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0 && e !== 'longjmp') throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        return dynCall_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0 && e !== 'longjmp') throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        return dynCall_iiiiiii(index, a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0 && e !== 'longjmp') throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiij(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        return dynCall_iiiij(index, a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0 && e !== 'longjmp') throw e
        _setThrew(1, 0)
      }
    }
    Module['asm'] = asm
    Module['cwrap'] = cwrap
    Module['callMain'] = callMain
    var calledRun
    Module['then'] = function (func) {
      if (calledRun) {
        func(Module)
      } else {
        var old = Module['onRuntimeInitialized']
        Module['onRuntimeInitialized'] = function () {
          if (old) old()
          func(Module)
        }
      }
      return Module
    }
    function ExitStatus(status) {
      this.name = 'ExitStatus'
      this.message = 'Program terminated with exit(' + status + ')'
      this.status = status
    }
    var calledMain = false
    dependenciesFulfilled = function runCaller() {
      if (!calledRun) run()
      if (!calledRun) dependenciesFulfilled = runCaller
    }
    function callMain(args) {
      var entryFunction = Module['_main']
      args = args || []
      var argc = args.length + 1
      var argv = stackAlloc((argc + 1) * 4)
      HEAP32[argv >> 2] = allocateUTF8OnStack(thisProgram)
      for (var i = 1; i < argc; i++) {
        HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1])
      }
      HEAP32[(argv >> 2) + argc] = 0
      try {
        var ret = entryFunction(argc, argv)
        exit(ret, true)
      } catch (e) {
        if (e instanceof ExitStatus) {
          return
        } else if (e == 'unwind') {
          noExitRuntime = true
          return
        } else {
          var toLog = e
          if (e && typeof e === 'object' && e.stack) {
            toLog = [e, e.stack]
          }
          err('exception thrown: ' + toLog)
          quit_(1, e)
        }
      } finally {
        calledMain = true
      }
    }
    function run(args) {
      args = args || arguments_
      if (runDependencies > 0) {
        return
      }
      preRun()
      if (runDependencies > 0) return
      function doRun() {
        if (calledRun) return
        calledRun = true
        Module['calledRun'] = true
        if (ABORT) return
        initRuntime()
        preMain()
        if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']()
        if (shouldRunNow) callMain(args)
        postRun()
      }
      if (Module['setStatus']) {
        Module['setStatus']('Running...')
        setTimeout(function () {
          setTimeout(function () {
            Module['setStatus']('')
          }, 1)
          doRun()
        }, 1)
      } else {
        doRun()
      }
    }
    Module['run'] = run
    function exit(status, implicit) {
      if (implicit && noExitRuntime && status === 0) {
        return
      }
      if (noExitRuntime) {
      } else {
        ABORT = true
        EXITSTATUS = status
        exitRuntime()
        if (Module['onExit']) Module['onExit'](status)
      }
      quit_(status, new ExitStatus(status))
    }
    if (Module['preInit']) {
      if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']]
      while (Module['preInit'].length > 0) {
        Module['preInit'].pop()()
      }
    }
    var shouldRunNow = false
    if (Module['noInitialRun']) shouldRunNow = false
    run()

    return Godot
  }
})()
if (typeof exports === 'object' && typeof module === 'object') module.exports = Godot
else if (typeof define === 'function' && define['amd'])
  define([], function () {
    return Godot
  })
else if (typeof exports === 'object') exports['Godot'] = Godot

const Preloader = /** @constructor */ function () {
  // eslint-disable-line no-unused-vars
  function getTrackedResponse(response, load_status) {
    function onloadprogress(reader, controller) {
      return reader.read().then(function (result) {
        if (load_status.done) {
          return Promise.resolve()
        }
        if (result.value) {
          controller.enqueue(result.value)
          load_status.loaded += result.value.length
        }
        if (!result.done) {
          return onloadprogress(reader, controller)
        }
        load_status.done = true
        return Promise.resolve()
      })
    }
    const reader = response.body.getReader()
    return new Response(
      new ReadableStream({
        start: function (controller) {
          onloadprogress(reader, controller).then(function () {
            controller.close()
          })
        }
      }),
      { headers: response.headers }
    )
  }

  function loadFetch(file, tracker, fileSize, raw) {
    tracker[file] = {
      total: fileSize || 0,
      loaded: 0,
      done: false
    }
    return fetch(file).then(function (response) {
      if (!response.ok) {
        return Promise.reject(new Error(`Failed loading file '${file}'`))
      }
      const tr = getTrackedResponse(response, tracker[file])
      if (raw) {
        return Promise.resolve(tr)
      }
      return tr.arrayBuffer()
    })
  }

  function retry(func, attempts = 1) {
    function onerror(err) {
      if (attempts <= 1) {
        return Promise.reject(err)
      }
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          retry(func, attempts - 1)
            .then(resolve)
            .catch(reject)
        }, 1000)
      })
    }
    return func().catch(onerror)
  }

  const DOWNLOAD_ATTEMPTS_MAX = 4
  const loadingFiles = {}
  const lastProgress = { loaded: 0, total: 0 }
  let progressFunc = null

  const animateProgress = function () {
    let loaded = 0
    let total = 0
    let totalIsValid = true
    let progressIsFinal = true

    Object.keys(loadingFiles).forEach(function (file) {
      const stat = loadingFiles[file]
      if (!stat.done) {
        progressIsFinal = false
      }
      if (!totalIsValid || stat.total === 0) {
        totalIsValid = false
        total = 0
      } else {
        total += stat.total
      }
      loaded += stat.loaded
    })
    if (loaded !== lastProgress.loaded || total !== lastProgress.total) {
      lastProgress.loaded = loaded
      lastProgress.total = total
      if (typeof progressFunc === 'function') {
        progressFunc(loaded, total)
      }
    }
    if (!progressIsFinal) {
      requestAnimationFrame(animateProgress)
    }
  }

  this.animateProgress = animateProgress

  this.setProgressFunc = function (callback) {
    progressFunc = callback
  }

  this.loadPromise = function (file, fileSize, raw = false) {
    return retry(loadFetch.bind(null, file, loadingFiles, fileSize, raw), DOWNLOAD_ATTEMPTS_MAX)
  }

  this.preloadedFiles = []
  this.preload = function (pathOrBuffer, destPath, fileSize) {
    let buffer = null
    if (typeof pathOrBuffer === 'string') {
      const me = this
      return this.loadPromise(pathOrBuffer, fileSize).then(function (buf) {
        me.preloadedFiles.push({
          path: destPath || pathOrBuffer,
          buffer: buf
        })
        return Promise.resolve()
      })
    } else if (pathOrBuffer instanceof ArrayBuffer) {
      buffer = new Uint8Array(pathOrBuffer)
    } else if (ArrayBuffer.isView(pathOrBuffer)) {
      buffer = new Uint8Array(pathOrBuffer.buffer)
    }
    if (buffer) {
      this.preloadedFiles.push({
        path: destPath,
        buffer: pathOrBuffer
      })
      return Promise.resolve()
    }
    return Promise.reject(new Error('Invalid object for preloading'))
  }
}

/**
 * An object used to configure the Engine instance based on godot export options, and to override those in custom HTML
 * templates if needed.
 *
 * @header Engine configuration
 * @summary The Engine configuration object. This is just a typedef, create it like a regular object, e.g.:
 *
 * ``const MyConfig = { executable: 'godot', unloadAfterInit: false }``
 *
 * @typedef {Object} EngineConfig
 */
const EngineConfig = {} // eslint-disable-line no-unused-vars

/**
 * @struct
 * @constructor
 * @ignore
 */
const InternalConfig = function (initConfig) {
  // eslint-disable-line no-unused-vars
  const cfg = /** @lends {InternalConfig.prototype} */ {
    /**
     * Whether the unload the engine automatically after the instance is initialized.
     *
     * @memberof EngineConfig
     * @default
     * @type {boolean}
     */
    unloadAfterInit: true,
    /**
     * The HTML DOM Canvas object to use.
     *
     * By default, the first canvas element in the document will be used is none is specified.
     *
     * @memberof EngineConfig
     * @default
     * @type {?HTMLCanvasElement}
     */
    canvas: null,
    /**
     * The name of the WASM file without the extension. (Set by Godot Editor export process).
     *
     * @memberof EngineConfig
     * @default
     * @type {string}
     */
    executable: '',
    /**
     * An alternative name for the game pck to load. The executable name is used otherwise.
     *
     * @memberof EngineConfig
     * @default
     * @type {?string}
     */
    mainPack: null,
    /**
     * Specify a language code to select the proper localization for the game.
     *
     * The browser locale will be used if none is specified. See complete list of
     * :ref:`supported locales <doc_locales>`.
     *
     * @memberof EngineConfig
     * @type {?string}
     * @default
     */
    locale: null,
    /**
     * The canvas resize policy determines how the canvas should be resized by Godot.
     *
     * ``0`` means Godot won't do any resizing. This is useful if you want to control the canvas size from
     * javascript code in your template.
     *
     * ``1`` means Godot will resize the canvas on start, and when changing window size via engine functions.
     *
     * ``2`` means Godot will adapt the canvas size to match the whole browser window.
     *
     * @memberof EngineConfig
     * @type {number}
     * @default
     */
    canvasResizePolicy: 2,
    /**
     * The arguments to be passed as command line arguments on startup.
     *
     * See :ref:`command line tutorial <doc_command_line_tutorial>`.
     *
     * **Note**: :js:meth:`startGame <Engine.prototype.startGame>` will always add the ``--main-pack`` argument.
     *
     * @memberof EngineConfig
     * @type {Array<string>}
     * @default
     */
    args: [],
    /**
     * When enabled, the game canvas will automatically grab the focus when the engine starts.
     *
     * @memberof EngineConfig
     * @type {boolean}
     * @default
     */
    focusCanvas: true,
    /**
     * When enabled, this will turn on experimental virtual keyboard support on mobile.
     *
     * @memberof EngineConfig
     * @type {boolean}
     * @default
     */
    experimentalVK: false,
    /**
     * The progressive web app service worker to install.
     * @memberof EngineConfig
     * @default
     * @type {string}
     */
    serviceWorker: '',
    /**
     * @ignore
     * @type {Array.<string>}
     */
    persistentPaths: ['/userfs'],
    /**
     * @ignore
     * @type {boolean}
     */
    persistentDrops: false,
    /**
     * @ignore
     * @type {Array.<string>}
     */
    gdnativeLibs: [],
    /**
     * @ignore
     * @type {Array.<string>}
     */
    fileSizes: [],
    /**
     * A callback function for handling Godot's ``OS.execute`` calls.
     *
     * This is for example used in the Web Editor template to switch between project manager and editor, and for running the game.
     *
     * @callback EngineConfig.onExecute
     * @param {string} path The path that Godot's wants executed.
     * @param {Array.<string>} args The arguments of the "command" to execute.
     */
    /**
     * @ignore
     * @type {?function(string, Array.<string>)}
     */
    onExecute: null,
    /**
     * A callback function for being notified when the Godot instance quits.
     *
     * **Note**: This function will not be called if the engine crashes or become unresponsive.
     *
     * @callback EngineConfig.onExit
     * @param {number} status_code The status code returned by Godot on exit.
     */
    /**
     * @ignore
     * @type {?function(number)}
     */
    onExit: null,
    /**
     * A callback function for displaying download progress.
     *
     * The function is called once per frame while downloading files, so the usage of ``requestAnimationFrame()``
     * is not necessary.
     *
     * If the callback function receives a total amount of bytes as 0, this means that it is impossible to calculate.
     * Possible reasons include:
     *
     * -  Files are delivered with server-side chunked compression
     * -  Files are delivered with server-side compression on Chromium
     * -  Not all file downloads have started yet (usually on servers without multi-threading)
     *
     * @callback EngineConfig.onProgress
     * @param {number} current The current amount of downloaded bytes so far.
     * @param {number} total The total amount of bytes to be downloaded.
     */
    /**
     * @ignore
     * @type {?function(number, number)}
     */
    onProgress: null,
    /**
     * A callback function for handling the standard output stream. This method should usually only be used in debug pages.
     *
     * By default, ``console.log()`` is used.
     *
     * @callback EngineConfig.onPrint
     * @param {...*} [var_args] A variadic number of arguments to be printed.
     */
    /**
     * @ignore
     * @type {?function(...*)}
     */
    onPrint: function () {
      console.log.apply(console, Array.from(arguments)) // eslint-disable-line no-console
    },
    /**
     * A callback function for handling the standard error stream. This method should usually only be used in debug pages.
     *
     * By default, ``console.error()`` is used.
     *
     * @callback EngineConfig.onPrintError
     * @param {...*} [var_args] A variadic number of arguments to be printed as errors.
     */
    /**
     * @ignore
     * @type {?function(...*)}
     */
    onPrintError: function (var_args) {
      console.error.apply(console, Array.from(arguments)) // eslint-disable-line no-console
    }
  }

  /**
   * @ignore
   * @struct
   * @constructor
   * @param {EngineConfig} opts
   */
  function Config(opts) {
    this.update(opts)
  }

  Config.prototype = cfg

  /**
   * @ignore
   * @param {EngineConfig} opts
   */
  Config.prototype.update = function (opts) {
    const config = opts || {}
    // NOTE: We must explicitly pass the default, accessing it via
    // the key will fail due to closure compiler renames.
    function parse(key, def) {
      if (typeof config[key] === 'undefined') {
        return def
      }
      return config[key]
    }
    // Module config
    this.unloadAfterInit = parse('unloadAfterInit', this.unloadAfterInit)
    this.onPrintError = parse('onPrintError', this.onPrintError)
    this.onPrint = parse('onPrint', this.onPrint)
    this.onProgress = parse('onProgress', this.onProgress)

    // Godot config
    this.canvas = parse('canvas', this.canvas)
    this.executable = parse('executable', this.executable)
    this.mainPack = parse('mainPack', this.mainPack)
    this.locale = parse('locale', this.locale)
    this.canvasResizePolicy = parse('canvasResizePolicy', this.canvasResizePolicy)
    this.persistentPaths = parse('persistentPaths', this.persistentPaths)
    this.persistentDrops = parse('persistentDrops', this.persistentDrops)
    this.experimentalVK = parse('experimentalVK', this.experimentalVK)
    this.focusCanvas = parse('focusCanvas', this.focusCanvas)
    this.serviceWorker = parse('serviceWorker', this.serviceWorker)
    this.gdnativeLibs = parse('gdnativeLibs', this.gdnativeLibs)
    this.fileSizes = parse('fileSizes', this.fileSizes)
    this.args = parse('args', this.args)
    this.onExecute = parse('onExecute', this.onExecute)
    this.onExit = parse('onExit', this.onExit)
  }

  /**
   * @ignore
   * @param {string} loadPath
   * @param {Response} response
   */
  Config.prototype.getModuleConfig = function (loadPath, response) {
    let r = response
    return {
      print: this.onPrint,
      printErr: this.onPrintError,
      thisProgram: this.executable,
      noExitRuntime: true,
      dynamicLibraries: [`${loadPath}.side.wasm`],
      instantiateWasm: function (imports, onSuccess) {
        function done(result) {
          onSuccess(result['instance'], result['module'])
        }
        if (typeof WebAssembly.instantiateStreaming !== 'undefined') {
          WebAssembly.instantiateStreaming(Promise.resolve(r), imports).then(done)
        } else {
          r.arrayBuffer().then(function (buffer) {
            WebAssembly.instantiate(buffer, imports).then(done)
          })
        }
        r = null
        return {}
      },
      locateFile: function (path) {
        if (path.endsWith('.worker.js')) {
          return `${loadPath}.worker.js`
        } else if (path.endsWith('.audio.worklet.js')) {
          return `${loadPath}.audio.worklet.js`
        } else if (path.endsWith('.js')) {
          return `${loadPath}.js`
        } else if (path.endsWith('.side.wasm')) {
          return `${loadPath}.side.wasm`
        } else if (path.endsWith('.wasm')) {
          return `${loadPath}.wasm`
        }
        return path
      }
    }
  }

  /**
   * @ignore
   * @param {function()} cleanup
   */
  Config.prototype.getGodotConfig = function (cleanup) {
    // Try to find a canvas
    if (!(this.canvas instanceof HTMLCanvasElement)) {
      const nodes = document.getElementsByTagName('canvas')
      if (nodes.length && nodes[0] instanceof HTMLCanvasElement) {
        this.canvas = nodes[0]
      }
      if (!this.canvas) {
        throw new Error('No canvas found in page')
      }
    }
    // Canvas can grab focus on click, or key events won't work.
    if (this.canvas.tabIndex < 0) {
      this.canvas.tabIndex = 0
    }

    // Browser locale, or custom one if defined.
    let locale = this.locale
    if (!locale) {
      locale = navigator.languages ? navigator.languages[0] : navigator.language
      locale = locale.split('.')[0]
    }
    locale = locale.replace('-', '_')
    const onExit = this.onExit

    // Godot configuration.
    return {
      canvas: this.canvas,
      canvasResizePolicy: this.canvasResizePolicy,
      locale: locale,
      persistentDrops: this.persistentDrops,
      virtualKeyboard: this.experimentalVK,
      focusCanvas: this.focusCanvas,
      onExecute: this.onExecute,
      onExit: function (p_code) {
        cleanup() // We always need to call the cleanup callback to free memory.
        if (typeof onExit === 'function') {
          onExit(p_code)
        }
      }
    }
  }
  return new Config(initConfig)
}

/**
 * Projects exported for the Web expose the :js:class:`Engine` class to the JavaScript environment, that allows
 * fine control over the engine's start-up process.
 *
 * This API is built in an asynchronous manner and requires basic understanding
 * of `Promises <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises>`__.
 *
 * @module Engine
 * @header HTML5 shell class reference
 */
const Engine = (function () {
  const preloader = new Preloader()

  let loadPromise = null
  let loadPath = ''
  let initPromise = null

  /**
   * @classdesc The ``Engine`` class provides methods for loading and starting exported projects on the Web. For default export
   * settings, this is already part of the exported HTML page. To understand practical use of the ``Engine`` class,
   * see :ref:`Custom HTML page for Web export <doc_customizing_html5_shell>`.
   *
   * @description Create a new Engine instance with the given configuration.
   *
   * @global
   * @constructor
   * @param {EngineConfig} initConfig The initial config for this instance.
   */
  function Engine(initConfig) {
    // eslint-disable-line no-shadow
    this.config = new InternalConfig(initConfig)
    this.rtenv = null
  }

  /**
   * Load the engine from the specified base path.
   *
   * @param {string} basePath Base path of the engine to load.
   * @param {number=} [size=0] The file size if known.
   * @returns {Promise} A Promise that resolves once the engine is loaded.
   *
   * @function Engine.load
   */
  Engine.load = function (basePath, size) {
    if (loadPromise == null) {
      loadPath = basePath
      loadPromise = preloader.loadPromise(`${loadPath}.wasm`, size, true)
      requestAnimationFrame(preloader.animateProgress)
    }
    return loadPromise
  }

  /**
   * Unload the engine to free memory.
   *
   * This method will be called automatically depending on the configuration. See :js:attr:`unloadAfterInit`.
   *
   * @function Engine.unload
   */
  Engine.unload = function () {
    loadPromise = null
  }

  /**
   * Check whether WebGL is available. Optionally, specify a particular version of WebGL to check for.
   *
   * @param {number=} [majorVersion=1] The major WebGL version to check for.
   * @returns {boolean} If the given major version of WebGL is available.
   * @function Engine.isWebGLAvailable
   */
  Engine.isWebGLAvailable = function (majorVersion = 1) {
    try {
      return !!document.createElement('canvas').getContext(['webgl', 'webgl2'][majorVersion - 1])
    } catch (e) {
      /* Not available */
    }
    return false
  }

  /**
   * Safe Engine constructor, creates a new prototype for every new instance to avoid prototype pollution.
   * @ignore
   * @constructor
   */
  function SafeEngine(initConfig) {
    const proto = /** @lends Engine.prototype */ {
      /**
       * Initialize the engine instance. Optionally, pass the base path to the engine to load it,
       * if it hasn't been loaded yet. See :js:meth:`Engine.load`.
       *
       * @param {string=} basePath Base path of the engine to load.
       * @return {Promise} A ``Promise`` that resolves once the engine is loaded and initialized.
       */
      init: function (basePath) {
        if (initPromise) {
          return initPromise
        }
        if (loadPromise == null) {
          if (!basePath) {
            initPromise = Promise.reject(
              new Error(
                'A base path must be provided when calling `init` and the engine is not loaded.'
              )
            )
            return initPromise
          }
          Engine.load(basePath, this.config.fileSizes[`${basePath}.wasm`])
        }
        const me = this
        function doInit(promise) {
          // Care! Promise chaining is bogus with old emscripten versions.
          // This caused a regression with the Mono build (which uses an older emscripten version).
          // Make sure to test that when refactoring.
          return new Promise(function (resolve, reject) {
            promise.then(function (response) {
              const cloned = new Response(response.clone().body, {
                headers: [['content-type', 'application/wasm']]
              })
              Godot(me.config.getModuleConfig(loadPath, cloned)).then(function (module) {
                const paths = me.config.persistentPaths
                module['initFS'](paths).then(function (err) {
                  me.rtenv = module
                  if (me.config.unloadAfterInit) {
                    Engine.unload()
                  }
                  resolve()
                })
              })
            })
          })
        }
        preloader.setProgressFunc(this.config.onProgress)
        initPromise = doInit(loadPromise)
        return initPromise
      },

      /**
       * Load a file so it is available in the instance's file system once it runs. Must be called **before** starting the
       * instance.
       *
       * If not provided, the ``path`` is derived from the URL of the loaded file.
       *
       * @param {string|ArrayBuffer} file The file to preload.
       *
       * If a ``string`` the file will be loaded from that path.
       *
       * If an ``ArrayBuffer`` or a view on one, the buffer will used as the content of the file.
       *
       * @param {string=} path Path by which the file will be accessible. Required, if ``file`` is not a string.
       *
       * @returns {Promise} A Promise that resolves once the file is loaded.
       */
      preloadFile: function (file, path) {
        return preloader.preload(file, path, this.config.fileSizes[file])
      },

      /**
       * Start the engine instance using the given override configuration (if any).
       * :js:meth:`startGame <Engine.prototype.startGame>` can be used in typical cases instead.
       *
       * This will initialize the instance if it is not initialized. For manual initialization, see :js:meth:`init <Engine.prototype.init>`.
       * The engine must be loaded beforehand.
       *
       * Fails if a canvas cannot be found on the page, or not specified in the configuration.
       *
       * @param {EngineConfig} override An optional configuration override.
       * @return {Promise} Promise that resolves once the engine started.
       */
      start: function (override) {
        this.config.update(override)
        const me = this
        return me.init().then(function () {
          if (!me.rtenv) {
            return Promise.reject(
              new Error('The engine must be initialized before it can be started')
            )
          }

          let config = {}
          try {
            config = me.config.getGodotConfig(function () {
              me.rtenv = null
            })
          } catch (e) {
            return Promise.reject(e)
          }
          // Godot configuration.
          me.rtenv['initConfig'](config)

          // Preload GDNative libraries.
          const libs = []
          me.config.gdnativeLibs.forEach(function (lib) {
            libs.push(me.rtenv['loadDynamicLibrary'](lib, { loadAsync: true }))
          })
          return Promise.all(libs).then(function () {
            return new Promise(function (resolve, reject) {
              preloader.preloadedFiles.forEach(function (file) {
                me.rtenv['copyToFS'](file.path, file.buffer)
              })
              preloader.preloadedFiles.length = 0 // Clear memory
              me.rtenv['callMain'](me.config.args)
              initPromise = null
              if (me.config.serviceWorker && 'serviceWorker' in navigator) {
                navigator.serviceWorker.register(me.config.serviceWorker)
              }
              resolve()
            })
          })
        })
      },

      /**
       * Start the game instance using the given configuration override (if any).
       *
       * This will initialize the instance if it is not initialized. For manual initialization, see :js:meth:`init <Engine.prototype.init>`.
       *
       * This will load the engine if it is not loaded, and preload the main pck.
       *
       * This method expects the initial config (or the override) to have both the :js:attr:`executable` and :js:attr:`mainPack`
       * properties set (normally done by the editor during export).
       *
       * @param {EngineConfig} override An optional configuration override.
       * @return {Promise} Promise that resolves once the game started.
       */
      startGame: function (override) {
        this.config.update(override)
        // Add main-pack argument.
        const exe = this.config.executable
        const pack = this.config.mainPack || `${exe}.pck`
        this.config.args = ['--main-pack', pack].concat(this.config.args)
        // Start and init with execName as loadPath if not inited.
        const me = this
        return Promise.all([this.init(exe), this.preloadFile(pack, pack)]).then(function () {
          return me.start.apply(me)
        })
      },

      /**
       * Create a file at the specified ``path`` with the passed as ``buffer`` in the instance's file system.
       *
       * @param {string} path The location where the file will be created.
       * @param {ArrayBuffer} buffer The content of the file.
       */
      copyToFS: function (path, buffer) {
        if (this.rtenv == null) {
          throw new Error('Engine must be inited before copying files')
        }
        this.rtenv['copyToFS'](path, buffer)
      },

      /**
       * Request that the current instance quit.
       *
       * This is akin the user pressing the close button in the window manager, and will
       * have no effect if the engine has crashed, or is stuck in a loop.
       *
       */
      requestQuit: function () {
        if (this.rtenv) {
          this.rtenv['request_quit']()
        }
      }
    }

    Engine.prototype = proto
    // Closure compiler exported instance methods.
    Engine.prototype['init'] = Engine.prototype.init
    Engine.prototype['preloadFile'] = Engine.prototype.preloadFile
    Engine.prototype['start'] = Engine.prototype.start
    Engine.prototype['startGame'] = Engine.prototype.startGame
    Engine.prototype['copyToFS'] = Engine.prototype.copyToFS
    Engine.prototype['requestQuit'] = Engine.prototype.requestQuit
    // Also expose static methods as instance methods
    Engine.prototype['load'] = Engine.load
    Engine.prototype['unload'] = Engine.unload
    Engine.prototype['isWebGLAvailable'] = Engine.isWebGLAvailable
    return new Engine(initConfig)
  }

  // Closure compiler exported static methods.
  SafeEngine['load'] = Engine.load
  SafeEngine['unload'] = Engine.unload
  SafeEngine['isWebGLAvailable'] = Engine.isWebGLAvailable

  return SafeEngine
})()
if (typeof window !== 'undefined') {
  window['Engine'] = Engine
}
