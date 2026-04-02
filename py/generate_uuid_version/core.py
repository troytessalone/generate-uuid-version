# py/core.py

import uuid

try:
    # Optional: real v7 support if installed
    from uuid6 import uuid7
    HAS_UUID7 = True
except ImportError:
    HAS_UUID7 = False


def generate_uuid(count=1, version="v7"):
    """
    Generate UUID values

    :param count: number of UUIDs (min 1, max 10)
    :param version: "v4" or "v7"
    :return: dict
    """

    # ===============================
    # VALIDATE COUNT
    # ===============================
    try:
        safe_count = int(count)
    except Exception:
        safe_count = 1

    if safe_count < 1:
        safe_count = 1
    if safe_count > 10:
        safe_count = 10

    # ===============================
    # NORMALIZE VERSION
    # ===============================
    normalized_version = str(version or "v7").lower()
    final_version = "v4" if normalized_version == "v4" else "v7"

    # ===============================
    # GENERATORS
    # ===============================
    def generate_v4():
        return str(uuid.uuid4())

    def generate_v7():
        if HAS_UUID7:
            return str(uuid7())
        # fallback if uuid7 not available
        return str(uuid.uuid4())

    generators = {
        "v4": generate_v4,
        "v7": generate_v7
    }

    generator = generators[final_version]

    # ===============================
    # GENERATE
    # ===============================
    result = [generator() for _ in range(safe_count)]

    return {
        "count": safe_count,
        "version": final_version,
        "items": {
            "first": result[0] if result else None,
            "last": result[-1] if result else None
        },
        "list": result
    }