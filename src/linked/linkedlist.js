class Node {
  constructor(val) {
    this.next = null
    this.value = val
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = this.head
    this.length = 0
  }

  push(val) {
    const newnode = new Node(val)
    if (!this.head) {
      this.head = newnode
      this.tail = this.head
      this.length++
      return this
    } else {
      const oldtail = this.tail
      oldtail.next = newnode
      this.tail = newnode
      this.length++
      return this
    }
  }

  pop() {
    if (!this.head) {
      return undefined
    }

    if (this.length === 1) {
      const head = this.head

      this.head = null
      this.tail = this.head
      this.length = 0
      return head
    } else {
      let current = this.head
      let newtail = current

      while (current.next) {
        newtail = current
        current = current.next
      }

      this.tail = newtail
      this.tail.next = null
      this.length--

      return current
    }
  }

  shift() {
    if (!this.head) {
      return undefined
    }

    if (this.length === 1) {
      let head = this.head
      this.head = null
      this.tail = this.head
      this.length--
      return head
    } else {
      let oldhead = this.head
      let current = this.head.next

      this.head = current
      oldhead.next = null
      this.length--

      return oldhead
    }
  }

  unshift(val) {
    let newnode = new Node(val)

    if (!this.head) {
      this.head = newnode
      this.tail = this.head
      this.length++
      return this
    } else {
      newnode.next = this.head
      this.head = newnode

      this.length++

      return this
    }
  }

  get(val) {
    if (val < 0 || val > this.length) {
      return null
    }

    if (!this.head) {
      return null
    }

    if (this.length === 1) {
      return this.head
    }

    let current = this.head

    for (let i = 0; i < val; i++) {
      current = current.next
    }

    return current
  }

  set(val, newval) {
    if (val < 0 || val > this.length) {
      return undefined
    }

    let current = this.get(val)
    current.value = newval

    return current
  }

  insert(idx, val) {
    if (idx > this.length || idx < 0) return undefined
    if (idx === this.length) return this.push(val)
    if (idx === 0) return this.unshift(val)
    let newnode = new Node(val)
    let next = this.get(idx)
    let prev = this.get(idx - 1)

    newnode.next = next
    prev.next = newnode

    this.length++

    return true
  }

  remove(idx) {
    if (idx < 0 || idx > this.length) {
      return undefined
    }

    if (idx === this.length) return this.pop()
    if (idx === 0) return this.shift()

    let old = this.get(idx)
    let prev = this.get(idx - 1)
    let next = this.get(idx + 1)

    prev.next = next
    old.next = null
    this.length--
    return old
  }

  reverse() {
    let current = this.head
    this.head = this.tail
    this.tail = current
    let prev = null
    let next
    let count = 0

    while (count !== this.length) {
      count++
      next = current.next
      current.next = prev
      prev = current
      current = next
    }
  }

  insertSort(val) {
    if (!this.head) {
      return this.push(val)
    }

    if (val <= this.head.value) {
      return this.unshift(val)
    }

    if (val >= this.tail.value) {
      return this.push(val)
    }

    let count = 0
    let current = this.head

    while (val > current.value) {
      count++
      current = current.next
    }

    this.insert(count, val)

    return this
  }
}

export default LinkedList
