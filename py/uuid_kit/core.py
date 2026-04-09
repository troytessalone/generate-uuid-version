# py/uuid_kit/core.py

import importlib
import uuid

_uuid7_fn = None

try:
    uuid6_module = importlib.import_module("uuid6")
    _uuid7_fn = uuid6_module.uuid7
    HAS_UUID7 = True
except Exception:
    HAS_UUID7 = False


ALLOWED_FORMATS = (
    "standard",
    "compact",
    "uppercase",
    "uppercase-compact"
)

ALLOWED_VERSIONS = (
    "v4",
    "v7"
)


def get_formatter(format_value):
    if format_value == "compact":
        return lambda v: v.replace("-", "")
    if format_value == "uppercase":
        return lambda v: v.upper()
    if format_value == "uppercase-compact":
        return lambda v: v.replace("-", "").upper()
    return lambda v: v


def extract_timestamp_v7(uuid_value):
    hex_value = uuid_value.replace("-", "")[:12]
    ms = int(hex_value, 16)

    from datetime import datetime, timezone

    dt = datetime.fromtimestamp(ms / 1000, tz=timezone.utc)

    return {
        "iso": dt.isoformat().replace("+00:00", "Z"),
        "unix": ms
    }


def generate_uuid(
    count=1,
    version="v7",
    format="standard",
    prefix="",
    suffix="",
    asObjects=False
):
    """
    Generate UUID values.

    :param count: number of UUIDs (min 1, max 100)
    :param version: "v4" or "v7"
    :param format: "standard", "compact", "uppercase", or "uppercase-compact"
    :param prefix: string to prepend to each UUID
    :param suffix: string to append to each UUID
    :param asObjects: if True, return structured item objects
    :return: dict
    """

    # ===============================
    # VALIDATE COUNT
    # ===============================
    try:
        safe_count = float(count)
    except Exception:
        safe_count = 1

    if safe_count != safe_count or safe_count < 0:
        safe_count = 1
    if safe_count > 100:
        safe_count = 100

    safe_count = int(safe_count)

    # ===============================
    # VALIDATE VERSION
    # ===============================
    normalized_version = str(version or "v7").lower()
    final_version = normalized_version if normalized_version in ALLOWED_VERSIONS else "v7"

    # ===============================
    # VALIDATE FORMAT
    # ===============================
    normalized_format = str(format or "standard").lower()
    final_format = normalized_format if normalized_format in ALLOWED_FORMATS else "standard"

    formatter = get_formatter(final_format)

    # ===============================
    # VERSION CONFIG
    # ===============================
    def generate_v4():
        return str(uuid.uuid4())

    def generate_v7():
        if HAS_UUID7 and _uuid7_fn:
            return str(_uuid7_fn())
        return str(uuid.uuid4())

    version_config = {
        "v4": {
            "generator": generate_v4,
            "hasTimestamp": False,
            "extractTimestamp": None
        },
        "v7": {
            "generator": generate_v7,
            "hasTimestamp": True,
            "extractTimestamp": extract_timestamp_v7
        }
    }

    generator = version_config[final_version]["generator"]
    has_timestamp = version_config[final_version]["hasTimestamp"]
    extract_timestamp = version_config[final_version]["extractTimestamp"]

    # ===============================
    # GENERATE
    # ===============================
    items = []

    for i in range(safe_count):
        raw = generator()

        timestamp = None
        if has_timestamp and extract_timestamp:
            try:
                timestamp = extract_timestamp(raw)
            except Exception:
                timestamp = None

        value = formatter(raw)

        if prefix:
            value = str(prefix) + value
        if suffix:
            value = value + str(suffix)

        if asObjects:
            obj = {
                "uuid": value,
                "raw": raw,
                "index": i
            }

            if timestamp:
                obj["timestamp"] = timestamp

            items.append(obj)
        else:
            items.append(value)

    return {
        "version": final_version,
        "format": final_format,
        "count": safe_count,
        "items": items
    }