# Database structure
---

```mermaid
classDiagram
    class tos {
       - id: int
       + season: int
       + episode: int
       + airdate: string
       + title: string
       + link: string
    }

    class tng {
       - id: int
       + season: int
       + episode: int
       + airdate: string
       + title: string
       + link: string
    }

    class ds9 {
       - id: int
       + season: int
       + episode: int
       + airdate: string
       + title: string
       + link: string
    }

    class voy {
       - id: int
       + season: int
       + episode: int
       + airdate: string
       + title: string
       + link: string
    }

    class ent {
       - id: int
       + season: int
       + episode: int
       + airdate: string
       + title: string
       + link: string
    }
```